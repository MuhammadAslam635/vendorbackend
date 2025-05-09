import { Body, Controller, Headers, HttpCode, HttpStatus, Post, UseGuards, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
  @Post('forgot-password')
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return this.authService.forgotPassword(forgotPasswordDto);
  }
  @Post('reset-password/:id')
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto, @Param('id') id: string) {
    return this.authService.resetPassword(resetPasswordDto, id);
  }
  @UseGuards(JwtAuthGuard)
    @Post('logout')
    async logout(@Headers('authorization') token: string) {
        return this.authService.logout(token);
    }
}
