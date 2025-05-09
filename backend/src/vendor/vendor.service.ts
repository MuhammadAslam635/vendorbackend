import { ConfigService } from '@nestjs/config';
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateVendorProfileDto } from './dto/create-vendor-profile.dto';
import { UpdateVendorProfileDto } from './dto/update-vendor-profile.dto';
import { PrismaService } from '../prisma/prisma.service';
import { join } from 'path';
import * as fs from 'fs/promises';
import { SearchVendorProfileDto } from './dto/search-vendor-profile.dto';

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
      console.log("object file", uniqueName)
      console.log("object folder path", folderPath)
      console.log("object path", filePath)

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

  async createProfile(
    userId: number,
    createVendorProfileDto: CreateVendorProfileDto,
    companyLogoPath?: string,
  ) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id: userId }
      });
     
      if (!user) {
        throw new NotFoundException('User not found');
      }
  
      // Handle possibly null activeProfiles and totalProfiles with defaults
      const activeProfiles = user.activeProfiles ?? 0;
      const totalProfiles = user.totalProfiles ?? 0;
      
      // Don't allow profile creation if totalProfiles is 0
      if (totalProfiles === 0) {
        throw new BadRequestException('You are not allowed to create profiles');
      }
      
      if (activeProfiles < totalProfiles) {
        const data = {
          ...createVendorProfileDto,
          ...(companyLogoPath ? { companyLogo: companyLogoPath } : {})
        };
  
        const profile = await this.prisma.vendorProfile.create({
          data: {
            ...data,
            userId
          }
        });
  
        await this.prisma.user.update({
          where: { id: userId },
          data: {
            activeProfiles: activeProfiles + 1
          }
        });
        
        return profile;
      } else {
        throw new BadRequestException('You have reached the maximum number of active profiles');
      }
    } catch (error) {
      console.error('Vendor profile creation error:', error);
      
      // Re-throw specific exceptions
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }
      
      throw new BadRequestException('Failed to create vendor profile');
    }
  }
  async updateProfile(
    updateVendorProfileDto: UpdateVendorProfileDto,
    id: string,
    companyLogoPath?: string,
) {
    try {
      const profileId = parseInt(id);
      
      const existingVendor = await this.prisma.vendorProfile.findUnique({
        where: { id: profileId }
      });

      if (!existingVendor) {
        throw new NotFoundException('Vendor profile not found');
      }

      // Remove any fields that should not be updated
      const { createdAt, updatedAt, userId: _, id: __, ...updateData } = updateVendorProfileDto as any;

      const data = {
        ...updateData,
        ...(companyLogoPath && { companyLogo: companyLogoPath })
      };

      return await this.prisma.vendorProfile.update({
        where: { 
          id: profileId  // Must be a number, not a string
        },
        data: {
          ...data,
          // Ensure these fields are not included in the update
          userId: undefined,
          createdAt: undefined,
          updatedAt: undefined,
        }
      });
    } catch (error) {
      console.error('Vendor update/create error:', error);
      throw new BadRequestException('Failed to update vendor profile');
    }
}

  async findByUserId(userId: number) {
    const vendors = await this.prisma.vendorProfile.findMany({
      where: { userId: userId }
    });

    if (!vendors) {
      throw new NotFoundException(`Vendor profile not found`);
    }

    return vendors;
  }
  async searchVendors(searchDto: SearchVendorProfileDto) {
    const { search } = searchDto;
    console.log("Search Query:", search);

    return this.prisma.vendorProfile.findMany({
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
    return this.prisma.vendorProfile.findMany();
  }
  async getProfile(id: string) {
    return this.prisma.vendorProfile.findUnique({
      where: { id: parseInt(id) }
    });
  }
}