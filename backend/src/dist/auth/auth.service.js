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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const user_service_1 = require("../user/user.service");
const bcrypt = require("bcrypt");
const tokenblocklistservice_service_1 = require("./tokenblocklistservice/tokenblocklistservice.service");
const mailer_1 = require("@nestjs-modules/mailer");
let AuthService = class AuthService {
    userService;
    jwtService;
    tokenBlacklistService;
    mailService;
    constructor(userService, jwtService, tokenBlacklistService, mailService) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.tokenBlacklistService = tokenBlacklistService;
        this.mailService = mailService;
    }
    async register(registerDto) {
        const { email, password, name } = registerDto;
        const activePackage = "NO";
        const user = await this.userService.create(email, password, name);
        const { password: _, ...result } = user;
        this.mailService.sendMail({
            to: email,
            subject: 'Account Created Successfully.',
            template: 'account-created',
            context: {
                name: user.name || 'Valued Customer',
                loginUrl: `${process.env.FRONTEND_URL}/login`,
                packagesUrl: `${process.env.FRONTEND_URL}/packages`,
                supportEmail: process.env.SUPPORT_EMAIL || 'support@yourplatform.com'
            }
        });
        return result;
    }
    async login(loginDto) {
        const { email, password } = loginDto;
        const user = await this.userService.findByEmail(email);
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const payload = {
            sub: user.id,
            email: user.email,
            utype: user.utype
        };
        return {
            access_token: this.jwtService.sign(payload),
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                utype: user.utype,
                createdAt: user.createdAt,
                status: user.status,
                emailVerified: user.email_verification_at,
                packageActive: user.packageActive,
            },
        };
    }
    async logout(token) {
        try {
            const cleanToken = token.replace('Bearer ', '');
            await this.jwtService.verify(cleanToken);
            this.tokenBlacklistService.addToBlacklist(cleanToken);
            return {
                message: 'Logged out successfully',
                success: true
            };
        }
        catch (error) {
            throw new common_1.UnauthorizedException('Invalid token');
        }
    }
    async forgotPassword(forgotPasswordDto) {
        const { email } = forgotPasswordDto;
        const user = await this.userService.findByEmail(email);
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        return {
            message: 'Password reset email sent',
            success: true,
            data: user.id
        };
    }
    async resetPassword(resetPasswordDto, id) {
        const { password } = resetPasswordDto;
        const user = await this.userService.findById(parseInt(id));
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await this.userService.updatePassword(parseInt(id), hashedPassword);
        return {
            message: 'Password reset successfully',
            success: true
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService,
        tokenblocklistservice_service_1.TokenBlacklistService,
        mailer_1.MailerService])
], AuthService);
//# sourceMappingURL=auth.service.js.map