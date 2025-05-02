import { ConfigService } from '@nestjs/config';
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateVendorDto } from './dto/create-vendor.dto';
import { UpdateVendorDto } from './dto/update-vendor.dto';
import { PrismaService } from '../prisma/prisma.service';
import { join } from 'path';
import * as fs from 'fs/promises';
import { SearchVendorDto } from './dto/search-vendor.dto';

@Injectable()
export class VendorService {
  constructor(private prisma: PrismaService,
    private configService: ConfigService
  ) {
    this.initializeUploadDirectories();
  }

  private readonly uploadDir = join(process.cwd(), 'public', 'uploads');
  private async initializeUploadDirectories() {
    try {
      await fs.mkdir(join(this.uploadDir, 'profiles'), { recursive: true });
      await fs.mkdir(join(this.uploadDir, 'logos'), { recursive: true });
      console.log('Upload directories created at:', this.uploadDir);
    } catch (error) {
      console.error('Failed to create upload directories:', error);
    }
  }
  private async saveFile(file: Express.Multer.File, subFolder: string): Promise<string> {
    console.log('saveFile called with:', {
      filename: file.originalname,
      mimetype: file.mimetype,
      size: file.buffer?.length,
      subFolder
    });
  
    try {
      if (!file?.buffer) {
        console.error('No file buffer found for:', file.originalname);
        throw new BadRequestException('No file buffer found');
      }
  
      // Get file extension from mimetype
      const mimeToExt = {
        'image/jpeg': '.jpg',
        'image/png': '.png',
        'image/gif': '.gif',
        'image/webp': '.webp'
      };
      const ext = mimeToExt[file.mimetype] || '.jpg';
  
      // Create unique filename with proper extension
      const uniqueName = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}${ext}`;
      const folderPath = join(this.uploadDir, subFolder);
      const filePath = join(folderPath, uniqueName);
      console.log("object file",uniqueName)
      console.log("object folder path",folderPath)
      console.log("object path",filePath)

      // Ensure directory exists
      await fs.mkdir(folderPath, { recursive: true });
  
      // Write file with buffer
      await fs.writeFile(filePath, file.buffer);
  
      // Verify file was written
      const stats = await fs.stat(filePath);
      console.log(`File saved successfully: ${filePath} (${stats.size} bytes)`);
      const backend = this.configService.get("BACKENDImg");
      return `/uploads/${subFolder}/${uniqueName}`;
    } catch (error) {
      console.error('File save error:', error);
      throw new BadRequestException(`Failed to save file: ${error.message}`);
    }
  }

  async updateOrCreate(
    userId: number,
    updateVendorDto: UpdateVendorDto,
    profileImgPath?: string,
    companyLogoPath?: string,
  ) {
    try {
      const existingVendor = await this.prisma.vendor.findUnique({
        where: { userId }
      });

      const data = {
        ...updateVendorDto,
        ...(profileImgPath && { profileImg: profileImgPath }),
        ...(companyLogoPath && { companyLogo: companyLogoPath })
      };

      if (existingVendor) {
        return await this.prisma.vendor.update({
          where: { userId },
          data
        });
      } else {
        return await this.prisma.vendor.create({
          data: {
            ...data,
            userId
          }
        });
      }
    } catch (error) {
      console.error('Vendor update/create error:', error);
      throw new BadRequestException('Failed to update vendor profile');
    }
  }

  async findByUserId(userId: number) {
    const vendor = await this.prisma.vendor.findUnique({
      where: { userId }
    });

    if (!vendor) {
      throw new NotFoundException(`Vendor profile not found`);
    }

    return vendor;
  }
  async searchVendors(searchDto: SearchVendorDto) {
    const { search } = searchDto; // Single query parameter named 'search'
    console.log("Search Query:", search);
  
    return this.prisma.vendor.findMany({
      where: {
        OR: [
          search ? { state: { contains: search, mode: 'insensitive' } } : {},
          search ? { city: { contains: search, mode: 'insensitive' } } : {},
          search ? { zipcode: { contains: search } } : {},
          search ? { address: { contains: search, mode: 'insensitive' } } : {},
          search ? { country: { contains: search, mode: 'insensitive' } } : {},
        ],
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
            status: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
  async getAllVendors() {
    return this.prisma.vendor.findMany();
  }
}