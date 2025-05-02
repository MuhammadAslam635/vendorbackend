import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class StatsService {
    constructor(private readonly prisma: PrismaService) {}
    async getStats() {
        const totalUsers = await this.prisma.user.count(
            {
                where: {
                    utype: 'VENDOR'
                }
            }
        );
        const totalPendingApprovals = await this.prisma.user.count({
            where: {
                utype: 'VENDOR',
                status: 'PENDING'
            }
        });
        const totalVendors = await this.prisma.vendor.count();
        const totalPackages = await this.prisma.package.count();
        const totalTransactions = await this.prisma.transaction.count();
        const totalCompletedTransactions = await this.prisma.transaction.count({
          where: { paymentStatus: 'COMPLETED' },
        });
    
        return {
          totalUsers,
          totalVendors,
          totalPackages,
          totalTransactions,
          totalCompletedTransactions,
          totalPendingApprovals
        };
    }
}
