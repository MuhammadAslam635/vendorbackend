import { ConfigService } from '@nestjs/config';
export declare class TokenBlacklistService {
    private configService;
    private blacklistedTokens;
    constructor(configService: ConfigService);
    addToBlacklist(token: string): void;
    isBlacklisted(token: string): boolean;
    private parseExpirationTime;
}
