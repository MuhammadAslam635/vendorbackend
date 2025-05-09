import { PrismaService } from 'src/prisma/prisma.service';
export declare class StatsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getStats(): Promise<{
        totalUsers: number;
        totalVendors: number;
        totalPackages: number;
        totalTransactions: number;
        totalCompletedTransactions: number;
        totalPendingApprovals: number;
    }>;
}
