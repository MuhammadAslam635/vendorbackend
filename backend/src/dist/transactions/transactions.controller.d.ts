import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
export declare class TransactionsController {
    private readonly transactionsService;
    constructor(transactionsService: TransactionsService);
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
    myAll(req: any): Promise<({
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
    findOne(id: string): Promise<{
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
    update(id: string, updateTransactionDto: UpdateTransactionDto): string;
    createPaymentSession(packageId: string, req: any): Promise<{
        paymentUrl: any;
        transactionId: number;
        orderId: string;
    }>;
    handleWebhook(payload: Record<string, any>, signature: string): Promise<{
        statusCode: number;
        headers: {
            Location: string;
        };
        body: null;
    }>;
    handlePaymentSuccess(req: any): Promise<{
        statusCode: number;
        headers: {
            Location: string;
        };
        body: null;
    }>;
    handlePaymentCancel(req: any): Promise<{
        statusCode: number;
        headers: {
            Location: string;
        };
        body: null;
    }>;
    private mapQuickPayStatus;
}
