import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { MailerService } from '@nestjs-modules/mailer';
import { join } from 'path';
import * as fs from 'fs/promises';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService,
    private mailService: MailerService,
    private configService: ConfigService
  ) { this.initializeUploadDirectories(); }
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
  async updateProfile(
    updateUserDto: UpdateUserDto,
    id: string,
    companyLogoPath?: string,
  ) {
    try {
      const profileId = parseInt(id);

      const existingUser = await this.prisma.user.findUnique({
        where: { id: profileId },
        include: {
          zipcodes: true
        }
      });

      if (!existingUser) {
        throw new NotFoundException('User profile not found');
      }

      // Parse zipcodes if it's a string
      const newZipcodes = Array.isArray(updateUserDto.zipcodes) 
        ? updateUserDto.zipcodes 
        : JSON.parse(updateUserDto.zipcodes || '[]');

      // Add null check and default value for totalzipcodes
      const totalAllowedZipcodes = existingUser.totalzipcodes ?? 0;

      // Check if total zipcodes would exceed limit
      if (newZipcodes.length > totalAllowedZipcodes) {
        throw new BadRequestException(`Cannot add more than ${totalAllowedZipcodes} zipcodes`);
      }

      // Remove zipcodes from updateData as we'll handle them separately
      const { zipcodes, createdAt, updatedAt, userId: _, id: __, ...updateData } = updateUserDto as any;

      // Start a transaction to handle both user update and zipcodes
      return await this.prisma.$transaction(async (prisma) => {
        // First, delete all existing zipcodes for this user
        await prisma.zipCode.deleteMany({
          where: {
            userId: profileId
          }
        });

        // Create new zipcodes
        const zipcodePromises = newZipcodes.map(async (zipcode: { zipcode: string }) => {
          return prisma.zipCode.create({
            data: {
              zipcode: zipcode.zipcode,
              userId: profileId
            }
          });
        });

        await Promise.all(zipcodePromises);

        // Update user profile with new data and addedzipcodes count
        const updatedUser = await prisma.user.update({
          where: {
            id: profileId
          },
          data: {
            ...updateData,
            addedzipcodes: newZipcodes.length, // Update the count of added zipcodes
            companyLogo: companyLogoPath || updateData.companyLogo,
            createdAt: undefined,
            updatedAt: undefined,
          },
          include: {
            zipcodes: true // Include updated zipcodes in response
          }
        });

        return updatedUser;
      });

    } catch (error) {
      console.error('User update error:', error);
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException('Failed to update user profile');
    }
  }
  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async findById(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async create(email: string, password: string, name: string = email.split('@')[0], phone: string, packageActive: string) {
    const existingUser = await this.findByEmail(email);

    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    return this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        phone,
        packageActive
      },
    });
  }
  async getUser(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: parseInt(id) },
      include: {
        zipcodes: true,
        subscribe_packages: true,
        gallery: true
      }
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
  async getAllUsers() {
    return this.prisma.user.findMany({
      where: {
        utype: 'VENDOR'
      },
      include: {
        zipcodes: true,
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
  }
  async updateStatus(id: number, status: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: id },
      include: {
        zipcodes: true
      }
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    if (user.utype !== 'VENDOR') {
      throw new ConflictException('Cannot update status for non-vendor users');
    }

    // Update user status
    const updatedUser = await this.prisma.user.update({
      where: { id: +id },
      data: {
        status: status
      },
      include: {
        zipcodes: true
      }
    });

    // If status is being set to active, send welcome email
    if (status === 'ACTIVE') {
      await this.mailService.sendMail({
        to: user.email,
        subject: 'Account Activated - Welcome to Our Platform!',
        template: 'account-activation', // Create this template in your mail templates
        context: {
          name: user.name || 'Valued Customer',
          loginUrl: `${process.env.FRONTEND_URL}/login`,
          packagesUrl: `${process.env.FRONTEND_URL}/packages`,
          supportEmail: process.env.SUPPORT_EMAIL || 'support@yourplatform.com'
        }
      });
    }

    return updatedUser;
  }

  async deleteUser(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        zipcodes: true
      }
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    // Delete user and associated vendor data in a transaction
    return this.prisma.$transaction(async (prisma) => {
      if (user.zipcodes) {
        await prisma.zipCode.deleteMany({
          where: { userId: id }
        });
      }

      return prisma.user.delete({
        where: { id }
      });
    });
  }
  async updatePassword(id: number, password: string) {
    return this.prisma.user.update({
      where: { id },
      data: { password }
    });
  }
}

