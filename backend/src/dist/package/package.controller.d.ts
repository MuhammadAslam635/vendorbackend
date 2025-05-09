import { PackageService } from './package.service';
import { CreatePackageDto } from './dto/create-package.dto';
import { UpdatePackageDto } from './dto/update-package.dto';
export declare class PackageController {
    private readonly packageService;
    constructor(packageService: PackageService);
    create(req: any, createPackageDto: CreatePackageDto): Promise<{
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
    findAll(req: any): Promise<{
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
    findOne(req: any, id: string): Promise<{
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
    update(req: any, id: string, updatePackageDto: UpdatePackageDto): Promise<{
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
    updateStatus(req: any, id: string): Promise<{
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
