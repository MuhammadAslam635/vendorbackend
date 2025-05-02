import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TokenBlacklistService {
    private blacklistedTokens: Set<string> = new Set();

    constructor(private configService: ConfigService) {}

    addToBlacklist(token: string): void {
        this.blacklistedTokens.add(token);
        
        // Remove token from blacklist after its expiration
        const expirationTime = this.configService.get<string>('JWT_EXPIRATION', '1d');
        setTimeout(() => {
            this.blacklistedTokens.delete(token);
        }, this.parseExpirationTime(expirationTime));
    }

    isBlacklisted(token: string): boolean {
        return this.blacklistedTokens.has(token);
    }

    private parseExpirationTime(expiration: string): number {
        const unit = expiration.slice(-1);
        const value = parseInt(expiration.slice(0, -1));
        
        switch(unit) {
            case 'd': return value * 24 * 60 * 60 * 1000;
            case 'h': return value * 60 * 60 * 1000;
            case 'm': return value * 60 * 1000;
            case 's': return value * 1000;
            default: return 24 * 60 * 60 * 1000;
        }
    }
}