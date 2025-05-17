import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { TokenBlacklistService } from './tokenblocklistservice/tokenblocklistservice.service';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { MailerService } from '@nestjs-modules/mailer';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private tokenBlacklistService: TokenBlacklistService,
    private mailService: MailerService
  ) { }

  async register(registerDto: RegisterDto) {
    console.log(registerDto);
    const { email, password, name = email.split('@')[0], phone } = registerDto; // Provide default values
    const user = await this.userService.create(email, password, name, phone, "NO");
    
    const { password: _, ...userData } = user;

    const frontendUrl = process.env.FRONTEND_URL || 'http://default-frontend-url.com';
    const supportEmail = process.env.SUPPORT_EMAIL || 'support@yourplatform.com';

    this.mailService.sendMail({
        to: email,
        subject: 'Account Created Successfully.',
        template: 'account-created',
        context: {
            name: user.name || 'Valued Customer',
            loginUrl: `${frontendUrl}/login`,
            packagesUrl: `${frontendUrl}/packages`,
            supportEmail: supportEmail
        }
    });

    // Create JWT payload and token, just like in login
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

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Ensure payload matches JwtStrategy validate method structure
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
  async logout(token: string) {
    try {
      // Remove 'Bearer ' prefix if present
      const cleanToken = token.replace('Bearer ', '');

      // Verify the token is valid before blacklisting
      await this.jwtService.verify(cleanToken);

      // Add token to blacklist
      this.tokenBlacklistService.addToBlacklist(cleanToken);

      return {
        message: 'Logged out successfully',
        success: true
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
  async forgotPassword(forgotPasswordDto: ForgotPasswordDto) {
    const { email } = forgotPasswordDto;
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return {
      message: 'Password reset email sent',
      success: true,
      data: user.id
    };
  }
  async resetPassword(resetPasswordDto: ResetPasswordDto, id: string) {
    const { password } = resetPasswordDto;
    const user = await this.userService.findById(parseInt(id));
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await this.userService.updatePassword(parseInt(id), hashedPassword);
    return {
      message: 'Password reset successfully',
      success: true
    };
  }
}
