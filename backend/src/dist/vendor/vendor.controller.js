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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const vendor_service_1 = require("./vendor.service");
const update_vendor_profile_dto_1 = require("./dto/update-vendor-profile.dto");
const multer_1 = require("multer");
const path = require("path");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const config_1 = require("@nestjs/config");
const search_vendor_profile_dto_1 = require("./dto/search-vendor-profile.dto");
const create_vendor_profile_dto_1 = require("./dto/create-vendor-profile.dto");
let VendorController = class VendorController {
    vendorService;
    configService;
    constructor(vendorService, configService) {
        this.vendorService = vendorService;
        this.configService = configService;
    }
    async createProfile(req, createVendorProfileDto, files) {
        const companyLogo = files?.companyLogo?.[0];
        const backendUrl = this.configService.get('BACKENDImg') || 'http://localhost:3000/public';
        return this.vendorService.createProfile(req.user.userId, createVendorProfileDto, companyLogo ? `${backendUrl}/uploads/logos/${companyLogo.filename}` : undefined);
    }
    async updateProfile(req, updateVendorProfileDto, id, files) {
        const companyLogo = files?.companyLogo?.[0];
        const backendUrl = this.configService.get('BACKENDImg') || 'http://localhost:3000/public';
        return this.vendorService.updateProfile(updateVendorProfileDto, id, companyLogo ? `${backendUrl}/uploads/logos/${companyLogo.filename}` : undefined);
    }
    async getProfile(id) {
        return this.vendorService.getProfile(id);
    }
    async findOne(req) {
        console.log("User from JWT:", req.user);
        return this.vendorService.findByUserId(req.user.userId);
    }
    async searchVendors(searchDto) {
        return this.vendorService.searchVendors(searchDto);
    }
    async getAllVendors() {
        return this.vendorService.getAllVendors();
    }
};
exports.VendorController = VendorController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('profile/create'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([
        { name: 'companyLogo', maxCount: 1 }
    ], {
        storage: (0, multer_1.diskStorage)({
            destination: (req, file, cb) => {
                const baseDir = path.join(process.cwd(), 'public', 'uploads');
                const dest = file.fieldname === 'companyLogo' ?
                    path.join(baseDir, 'logos') :
                    path.join(baseDir, 'profiles');
                cb(null, dest);
            },
            filename: (req, file, cb) => {
                const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
                const ext = path.extname(file.originalname || '');
                const prefix = file.fieldname === 'companyLogo' ? 'logo' : 'profile';
                cb(null, `${prefix}_${uniqueSuffix}${ext}`);
            }
        })
    })),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_vendor_profile_dto_1.CreateVendorProfileDto, Object]),
    __metadata("design:returntype", Promise)
], VendorController.prototype, "createProfile", null);
__decorate([
    (0, common_1.Patch)('profile/update/:id'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([
        { name: 'companyLogo', maxCount: 1 }
    ], {
        storage: (0, multer_1.diskStorage)({
            destination: (req, file, cb) => {
                const baseDir = path.join(process.cwd(), 'public', 'uploads');
                const dest = file.fieldname === 'companyLogo' ?
                    path.join(baseDir, 'logos') :
                    path.join(baseDir, 'profiles');
                cb(null, dest);
            },
            filename: (req, file, cb) => {
                const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
                const ext = path.extname(file.originalname || '');
                const prefix = file.fieldname === 'companyLogo' ? 'logo' : 'profile';
                cb(null, `${prefix}_${uniqueSuffix}${ext}`);
            }
        })
    })),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Param)('id')),
    __param(3, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_vendor_profile_dto_1.UpdateVendorProfileDto, String, Object]),
    __metadata("design:returntype", Promise)
], VendorController.prototype, "updateProfile", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('profile/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], VendorController.prototype, "getProfile", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('/profiles'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], VendorController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)("/search"),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [search_vendor_profile_dto_1.SearchVendorProfileDto]),
    __metadata("design:returntype", Promise)
], VendorController.prototype, "searchVendors", null);
__decorate([
    (0, common_1.Get)("/all"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], VendorController.prototype, "getAllVendors", null);
exports.VendorController = VendorController = __decorate([
    (0, common_1.Controller)('vendor'),
    __metadata("design:paramtypes", [vendor_service_1.VendorService,
        config_1.ConfigService])
], VendorController);
//# sourceMappingURL=vendor.controller.js.map