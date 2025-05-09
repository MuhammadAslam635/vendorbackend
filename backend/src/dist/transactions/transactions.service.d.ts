import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
interface WebhookPayload {
    orderId: string;
    status: string;
    transactionId: string;
    amount?: number;
}
export declare class TransactionsService {
    private prisma;
    private configService;
    constructor(prisma: PrismaService, configService: ConfigService);
    create(createTransactionDto: CreateTransactionDto): string;
    findAll(): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        amount: number;
        paymentMethod: string;
        paymentStatus: string;
        transactionId: string | null;
        subscribe_package_id: number;
    }[]>;
    myAllT(userId: number): Promise<({
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
        subscribe_package: {
            id: number;
            status: string;
            createdAt: Date;
            updatedAt: Date;
            userId: number;
            startDate: Date;
            endDate: Date;
            packageId: number;
        };
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        amount: number;
        paymentMethod: string;
        paymentStatus: string;
        transactionId: string | null;
        subscribe_package_id: number;
    })[]>;
    findOne(id: number): Promise<{
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
        subscribe_package: {
            id: number;
            status: string;
            createdAt: Date;
            updatedAt: Date;
            userId: number;
            startDate: Date;
            endDate: Date;
            packageId: number;
        };
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        amount: number;
        paymentMethod: string;
        paymentStatus: string;
        transactionId: string | null;
        subscribe_package_id: number;
    }>;
    update(id: number, updateTransactionDto: UpdateTransactionDto): string;
    createPaymentSession(userId: number, packageId: number): Promise<{
        paymentUrl: any;
        transactionId: number;
        orderId: string;
    }>;
    verifyWebhookSignature(payload: any, signature: string): Promise<boolean>;
    handleWebhook(payload: WebhookPayload): Promise<{
        statusCode: number;
        headers: {
            Location: string;
        };
        body: null;
    }>;
    confirmPaymentSuccess(orderId: string): Promise<{
        statusCode: number;
        headers: {
            Location: string;
        };
        body: null;
    }>;
    handlePaymentCancel(orderId: string): Promise<{
        statusCode: number;
        headers: {
            Location: string;
        };
        body: null;
    }>;
    private redirect;
}
export {};
