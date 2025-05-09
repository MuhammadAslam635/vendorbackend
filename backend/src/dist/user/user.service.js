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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const bcrypt = require("bcrypt");
const mailer_1 = require("@nestjs-modules/mailer");
let UserService = class UserService {
    prisma;
    mailService;
    constructor(prisma, mailService) {
        this.prisma = prisma;
        this.mailService = mailService;
    }
    async findByEmail(email) {
        return this.prisma.user.findUnique({
            where: { email },
        });
    }
    async findById(id) {
        const user = await this.prisma.user.findUnique({
            where: { id },
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return user;
    }
    async create(email, password, name = email.split('@')[0]) {
        const existingUser = await this.findByEmail(email);
        if (existingUser) {
            throw new common_1.ConflictException('Email already exists');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        return this.prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
            },
        });
    }
    async getUser(id) {
        const user = await this.prisma.user.findUnique({
            where: { id: parseInt(id) },
            include: {
                profiles: true,
                subscribe_packages: true
            }
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return user;
    }
    async getAllUsers() {
        return this.prisma.user.findMany({
            where: {
                utype: 'VENDOR'
            },
            include: {
                profiles: true,
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
    }
    async updateStatus(id, status) {
        const user = await this.prisma.user.findUnique({
            where: { id: id },
            include: {
                profiles: true
            }
        });
        if (!user) {
            throw new common_1.NotFoundException(`User with ID ${id} not found`);
        }
        if (user.utype !== 'VENDOR') {
            throw new common_1.ConflictException('Cannot update status for non-vendor users');
        }
        const updatedUser = await this.prisma.user.update({
            where: { id: +id },
            data: {
                status: status
            },
            include: {
                profiles: true
            }
        });
        if (status === 'ACTIVE') {
            await this.mailService.sendMail({
                to: user.email,
                subject: 'Account Activated - Welcome to Our Platform!',
                template: 'account-activation',
                context: {
                    name: user.name || 'Valued Customer',
                    loginUrl: `${process.env.FRONTEND_URL}/login`,
                    packagesUrl: `${process.env.FRONTEND_URL}/packages`,
                    supportEmail: process.env.SUPPORT_EMAIL || 'support@yourplatform.com'
                }
            });
        }
        return updatedUser;
    }
    async deleteUser(id) {
        const user = await this.prisma.user.findUnique({
            where: { id },
            include: {
                profiles: true
            }
        });
        if (!user) {
            throw new common_1.NotFoundException(`User with ID ${id} not found`);
        }
        return this.prisma.$transaction(async (prisma) => {
            if (user.profiles) {
                await prisma.vendorProfile.deleteMany({
                    where: { userId: id }
                });
            }
            return prisma.user.delete({
                where: { id }
            });
        });
    }
    async updatePassword(id, password) {
        return this.prisma.user.update({
            where: { id },
            data: { password }
        });
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        mailer_1.MailerService])
], UserService);
//# sourceMappingURL=user.service.js.map