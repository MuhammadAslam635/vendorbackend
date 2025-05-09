import { VendorService } from './vendor.service';
import { UpdateVendorProfileDto } from './dto/update-vendor-profile.dto';
import { ConfigService } from '@nestjs/config';
import { SearchVendorProfileDto } from './dto/search-vendor-profile.dto';
import { CreateVendorProfileDto } from './dto/create-vendor-profile.dto';
export declare class VendorController {
    private readonly vendorService;
    private configService;
    constructor(vendorService: VendorService, configService: ConfigService);
    createProfile(req: any, createVendorProfileDto: CreateVendorProfileDto, files: {
        companyLogo?: Express.Multer.File[];
    }): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        company: string | null;
        state: string | null;
        city: string | null;
        zipcode: string | null;
        address: string | null;
        country: string | null;
        companyLogo: string | null;
        fb: string | null;
        ln: string | null;
        in: string | null;
        yt: string | null;
        webUrl: string | null;
        userId: number;
    }>;
    updateProfile(req: any, updateVendorProfileDto: UpdateVendorProfileDto, id: string, files: {
        companyLogo?: Express.Multer.File[];
    }): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        company: string | null;
        state: string | null;
        city: string | null;
        zipcode: string | null;
        address: string | null;
        country: string | null;
        companyLogo: string | null;
        fb: string | null;
        ln: string | null;
        in: string | null;
        yt: string | null;
        webUrl: string | null;
        userId: number;
    }>;
    getProfile(id: string): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        company: string | null;
        state: string | null;
        city: string | null;
        zipcode: string | null;
        address: string | null;
        country: string | null;
        companyLogo: string | null;
        fb: string | null;
        ln: string | null;
        in: string | null;
        yt: string | null;
        webUrl: string | null;
        userId: number;
    } | null>;
    findOne(req: any): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        company: string | null;
        state: string | null;
        city: string | null;
        zipcode: string | null;
        address: string | null;
        country: string | null;
        companyLogo: string | null;
        fb: string | null;
        ln: string | null;
        in: string | null;
        yt: string | null;
        webUrl: string | null;
        userId: number;
    }[]>;
    searchVendors(searchDto: SearchVendorProfileDto): Promise<({
        user: {
            name: string;
            email: string;
            status: string;
        };
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        company: string | null;
        state: string | null;
        city: string | null;
        zipcode: string | null;
        address: string | null;
        country: string | null;
        companyLogo: string | null;
        fb: string | null;
        ln: string | null;
        in: string | null;
        yt: string | null;
        webUrl: string | null;
        userId: number;
    })[]>;
    getAllVendors(): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        company: string | null;
        state: string | null;
        city: string | null;
        zipcode: string | null;
        address: string | null;
        country: string | null;
        companyLogo: string | null;
        fb: string | null;
        ln: string | null;
        in: string | null;
        yt: string | null;
        webUrl: string | null;
        userId: number;
    }[]>;
}
