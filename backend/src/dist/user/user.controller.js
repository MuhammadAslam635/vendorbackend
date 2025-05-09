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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const update_status_dto_1 = require("./dto/update-status.dto");
const mailer_1 = require("@nestjs-modules/mailer");
let UserController = class UserController {
    userService;
    mailService;
    constructor(userService, mailService) {
        this.userService = userService;
        this.mailService = mailService;
    }
    async getProfile(req) {
        const user = await this.userService.getUser(req.user.userId);
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }
    async getAllUsers() {
        return this.userService.getAllUsers();
    }
    async updateStatus(id, updateStatusDto) {
        return this.userService.updateStatus(+id, updateStatusDto.status);
    }
    async deleteUser(id) {
        return this.userService.deleteUser(+id);
    }
    async getUser(id) {
        return this.userService.getUser(id);
    }
    async testActivationEmail() {
        try {
            const user = await this.userService.getUser('2');
            return await this.mailService.sendMail({
                to: 'muhaffan945@gmail.com',
                subject: 'Test Activation Email',
                template: 'account-activation',
                context: {
                    name: user.name || 'Valued Customer',
                    loginUrl: `${process.env.FRONTEND_URL}/login`,
                    packagesUrl: `${process.env.FRONTEND_URL}/packages`,
                    supportEmail: process.env.SUPPORT_EMAIL || 'support@yourplatform.com'
                }
            });
        }
        catch (error) {
            console.error('Email error:', error);
            throw new common_1.BadRequestException('Failed to send test email');
        }
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('me'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getProfile", null);
__decorate([
    (0, common_1.Get)("/"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getAllUsers", null);
__decorate([
    (0, common_1.Patch)(':id/status'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_status_dto_1.UpdateStatusDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateStatus", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteUser", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUser", null);
__decorate([
    (0, common_1.Get)('/email/test-email'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "testActivationEmail", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService,
        mailer_1.MailerService])
], UserController);
//# sourceMappingURL=user.controller.js.map