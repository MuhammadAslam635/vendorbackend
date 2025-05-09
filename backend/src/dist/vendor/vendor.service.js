"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorService = void 0;
const config_1 = require("@nestjs/config");
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const path_1 = require("path");
const fs = require("fs/promises");
let VendorService = class VendorService {
    prisma;
    configService;
    constructor(prisma, configService) {
        this.prisma = prisma;
        this.configService = configService;
        this.initializeUploadDirectories();
    }
    uploadDir = (0, path_1.join)(process.cwd(), 'public', 'uploads');
    async initializeUploadDirectories() {
        try {
            await fs.mkdir((0, path_1.join)(this.uploadDir, 'logos'), { recursive: true });
            console.log('Upload directories created at:', this.uploadDir);
        }
        catch (error) {
            console.error('Failed to create upload directories:', error);
        }
    }
    async saveFile(file, subFolder) {
        console.log('saveFile called with:', {
            filename: file.originalname,
            mimetype: file.mimetype,
            size: file.buffer?.length,
            subFolder
        });
        try {
            if (!file?.buffer) {
                console.error('No file buffer found for:', file.originalname);
                throw new common_1.BadRequestException('No file buffer found');
            }
            const mimeToExt = {
                'image/jpeg': '.jpg',
                'image/png': '.png',
                'image/gif': '.gif',
                'image/webp': '.webp'
            };
            const ext = mimeToExt[file.mimetype] || '.jpg';
            const uniqueName = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}${ext}`;
            const folderPath = (0, path_1.join)(this.uploadDir, subFolder);
            const filePath = (0, path_1.join)(folderPath, uniqueName);
            console.log("object file", uniqueName);
            console.log("object folder path", folderPath);
            console.log("object path", filePath);
            await fs.mkdir(folderPath, { recursive: true });
            await fs.writeFile(filePath, file.buffer);
            const stats = await fs.stat(filePath);
            console.log(`File saved successfully: ${filePath} (${stats.size} bytes)`);
            const backend = this.configService.get("BACKENDImg");
            return `/uploads/${subFolder}/${uniqueName}`;
        }
        catch (error) {
            console.error('File save error:', error);
            throw new common_1.BadRequestException(`Failed to save file: ${error.message}`);
        }
    }
    async createProfile(userId, createVendorProfileDto, companyLogoPath) {
        try {
            const user = await this.prisma.user.findUnique({
                where: { id: userId }
            });
            if (!user) {
                throw new common_1.NotFoundException('User not found');
            }
            const activeProfiles = user.activeProfiles ?? 0;
            const totalProfiles = user.totalProfiles ?? 0;
            if (totalProfiles === 0) {
                throw new common_1.BadRequestException('You are not allowed to create profiles');
            }
            if (activeProfiles < totalProfiles) {
                const data = {
                    ...createVendorProfileDto,
                    ...(companyLogoPath ? { companyLogo: companyLogoPath } : {})
                };
                const profile = await this.prisma.vendorProfile.create({
                    data: {
                        ...data,
                        userId
                    }
                });
                await this.prisma.user.update({
                    where: { id: userId },
                    data: {
                        activeProfiles: activeProfiles + 1
                    }
                });
                return profile;
            }
            else {
                throw new common_1.BadRequestException('You have reached the maximum number of active profiles');
            }
        }
        catch (error) {
            console.error('Vendor profile creation error:', error);
            if (error instanceof common_1.NotFoundException || error instanceof common_1.BadRequestException) {
                throw error;
            }
            throw new common_1.BadRequestException('Failed to create vendor profile');
        }
    }
    async updateProfile(updateVendorProfileDto, id, companyLogoPath) {
        try {
            const profileId = parseInt(id);
            const existingVendor = await this.prisma.vendorProfile.findUnique({
                where: { id: profileId }
            });
            if (!existingVendor) {
                throw new common_1.NotFoundException('Vendor profile not found');
            }
            const { createdAt, updatedAt, userId: _, id: __, ...updateData } = updateVendorProfileDto;
            const data = {
                ...updateData,
                ...(companyLogoPath && { companyLogo: companyLogoPath })
            };
            return await this.prisma.vendorProfile.update({
                where: {
                    id: profileId
                },
                data: {
                    ...data,
                    userId: undefined,
                    createdAt: undefined,
                    updatedAt: undefined,
                }
            });
        }
        catch (error) {
            console.error('Vendor update/create error:', error);
            throw new common_1.BadRequestException('Failed to update vendor profile');
        }
    }
    async findByUserId(userId) {
        const vendors = await this.prisma.vendorProfile.findMany({
            where: { userId: userId }
        });
        if (!vendors) {
            throw new common_1.NotFoundException(`Vendor profile not found`);
        }
        return vendors;
    }
    async searchVendors(searchDto) {
        const { search } = searchDto;
        console.log("Search Query:", search);
        return this.prisma.vendorProfile.findMany({
            where: {
                OR: [
                    search ? { state: { contains: search, mode: 'insensitive' } } : {},
                    search ? { city: { contains: search, mode: 'insensitive' } } : {},
                    search ? { zipcode: { contains: search } } : {},
                    search ? { address: { contains: search, mode: 'insensitive' } } : {},
                    search ? { country: { contains: search, mode: 'insensitive' } } : {},
                ],
            },
            include: {
                user: {
                    select: {
                        name: true,
                        email: true,
                        status: true,
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
    }
    async getAllVendors() {
        return this.prisma.vendorProfile.findMany();
    }
    async getProfile(id) {
        return this.prisma.vendorProfile.findUnique({
            where: { id: parseInt(id) }
        });
    }
};
exports.VendorService = VendorService;
exports.VendorService = VendorService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        config_1.ConfigService])
], VendorService);
//# sourceMappingURL=vendor.service.js.map