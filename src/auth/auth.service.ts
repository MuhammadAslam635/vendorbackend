import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { TokenBlacklistService } from './tokenblocklistservice/tokenblocklistservice.service';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
        private tokenBlacklistService: TokenBlacklistService,
      ) {}
    
      async register(registerDto: RegisterDto) {
        const { email, password, name } = registerDto;
        const activePackage = "NO";
        const user = await this.userService.create(email, password, name);
        
        const { password: _, ...result } = user;
        return result;
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
}
