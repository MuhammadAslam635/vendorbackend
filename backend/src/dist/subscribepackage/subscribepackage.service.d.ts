import { PrismaService } from 'src/prisma/prisma.service';
export declare class SubscribepackageService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getUserPackage(userId: number): Promise<({
        user: {
            id: number;
            name: string;
            email: string;
            password: string;
            email_verification_at: Date | null;
            utype: string;
            status: string;
            packageActive: string;
            totalProfiles: number | null;
            activeProfiles: number | null;
            createdAt: Date;
            updatedAt: Date;
        };
        package: {
            id: number;
            name: string | null;
            status: string;
            createdAt: Date;
            updatedAt: Date;
            profiles: number;
            price: number;
            duration: number;
            description: string | null;
        };
        transaction: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            userId: number;
            amount: number;
            paymentMethod: string;
            paymentStatus: string;
            transactionId: string | null;
            subscribe_package_id: number;
        } | null;
    } & {
        id: number;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        startDate: Date;
        endDate: Date;
        packageId: number;
    }) | null>;
}
