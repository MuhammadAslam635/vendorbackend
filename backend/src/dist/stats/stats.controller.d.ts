import { StatsService } from './stats.service';
export declare class StatsController {
    private readonly statsService;
    constructor(statsService: StatsService);
    getStats(): Promise<{
        totalUsers: number;
        totalVendors: number;
        totalPackages: number;
        totalTransactions: number;
        totalCompletedTransactions: number;
        totalPendingApprovals: number;
    }>;
}
