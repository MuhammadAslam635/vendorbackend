import { PrismaService } from '../prisma/prisma.service';
import { CreatePackageDto } from './dto/create-package.dto';
import { UpdatePackageDto } from './dto/update-package.dto';
export declare class PackageService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createPackageDto: CreatePackageDto): Promise<{
        id: number;
        name: string | null;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        profiles: number;
        price: number;
        duration: number;
        description: string | null;
    }>;
    findAll(): Promise<{
        id: number;
        name: string | null;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        profiles: number;
        price: number;
        duration: number;
        description: string | null;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        name: string | null;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        profiles: number;
        price: number;
        duration: number;
        description: string | null;
    }>;
    update(id: number, updatePackageDto: UpdatePackageDto): Promise<{
        id: number;
        name: string | null;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        profiles: number;
        price: number;
        duration: number;
        description: string | null;
    }>;
    updateStatus(id: number): Promise<{
        id: number;
        name: string | null;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        profiles: number;
        price: number;
        duration: number;
        description: string | null;
    }>;
}
