import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { TokenBlacklistService } from './tokenblocklistservice/tokenblocklistservice.service';
import { JwtStrategy } from './jwtstrategy';

@Module({
  imports: [
    PassportModule,
    UserModule,  // Add UserModule to imports
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [AuthService, JwtStrategy, UserService, TokenBlacklistService],  // Remove JwtService from here
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}