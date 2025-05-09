import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { TokenBlacklistService } from './tokenblocklistservice/tokenblocklistservice.service';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { MailerService } from '@nestjs-modules/mailer';
export declare class AuthService {
    private userService;
    private jwtService;
    private tokenBlacklistService;
    private mailService;
    constructor(userService: UserService, jwtService: JwtService, tokenBlacklistService: TokenBlacklistService, mailService: MailerService);
    register(registerDto: RegisterDto): Promise<{
        id: number;
        name: string;
        email: string;
        email_verification_at: Date | null;
        utype: string;
        status: string;
        packageActive: string;
        totalProfiles: number | null;
        activeProfiles: number | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    login(loginDto: LoginDto): Promise<{
        access_token: string;
        user: {
            id: number;
            email: string;
            name: string;
            utype: string;
            createdAt: Date;
            status: string;
            emailVerified: Date | null;
            packageActive: string;
        };
    }>;
    logout(token: string): Promise<{
        message: string;
        success: boolean;
    }>;
    forgotPassword(forgotPasswordDto: ForgotPasswordDto): Promise<{
        message: string;
        success: boolean;
        data: number;
    }>;
    resetPassword(resetPasswordDto: ResetPasswordDto, id: string): Promise<{
        message: string;
        success: boolean;
    }>;
}
