import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { MailerService } from '@nestjs-modules/mailer';
import { join } from 'path';
import * as fs from 'fs/promises';
import { ConfigService } from '@nestjs/config';
import { CreateUserDto, PermissionType, UserStatus } from './dto/create-user.dto';
import { UpdateAdminUserDto } from './dto/update-admin-user.dto';

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
      const updatedUser = await this.prisma.user.update({
        where: {
          id: profileId
        },
        data: {
          ...updateUserDto,
          companyLogo: companyLogoPath || updateUserDto.companyLogo
        },
        include: {
          zipcodes: true // Include updated zipcodes in response
        }
      });

      return updatedUser;

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
      include: {
        permissions:true
      }
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
        status: status as UserStatus
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
        zipcodes: true,
        transactions: true,
        gallery: true,
        subscribe_packages: true
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

  async createUser(createUserDto: CreateUserDto) {
    // Check if email already exists
    const existingUser = await this.prisma.user.findUnique({
      where: { email: createUserDto.email },
    });

    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    // Check if phone number already exists (only if phone is provided)
    if (createUserDto.phone) {
      const phoneExists = await this.prisma.user.findFirst({
        where: { phone: createUserDto.phone },
      });

      if (phoneExists) {
        throw new ConflictException('Phone number already exists');
      }
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    // Extract permissions from DTO
    const { permissions, ...userDataWithoutPermissions } = createUserDto;
    const userPermissions = permissions || [PermissionType.APPROVAL];

    try {
      // Create user with permissions in a transaction
      const result = await this.prisma.$transaction(async (prisma) => {
        // Create the user
        const newUser = await prisma.user.create({
          data: {
            ...userDataWithoutPermissions,
            password: hashedPassword,
            email_verification_at: new Date(),
          },
        });

        // Create multiple permissions for the user
        await prisma.permission.createMany({
          data: userPermissions.map(permission => ({
            userId: newUser.id,
            name: permission,
          })),
        });

        return newUser;
      });

      return {
        message: 'User created successfully',
        status: 'success',
        data: {
          id: result.id,
          name: result.name,
          email: result.email,
          utype: result.utype,
          status: result.status,
          permissions: userPermissions,
        },
      };
    } catch (error) {
      // Handle transaction errors
      throw new ConflictException('Failed to create user and permissions');
    }
  }

  async updateUser(id: number, updateUserDto: UpdateAdminUserDto) {
    // Check if user exists
    const existingUser = await this.prisma.user.findUnique({
      where: { id },
      include: { permissions: true },
    });

    if (!existingUser) {
      throw new NotFoundException('User not found');
    }

    // Check email uniqueness if email is being updated
    if (updateUserDto.email && updateUserDto.email !== existingUser.email) {
      const emailExists = await this.prisma.user.findUnique({
        where: { email: updateUserDto.email },
      });

      if (emailExists) {
        throw new ConflictException('Email already exists');
      }
    }

    // Check phone uniqueness if phone is being updated
    if (updateUserDto.phone && updateUserDto.phone !== existingUser.phone) {
      const phoneExists = await this.prisma.user.findFirst({
        where: { phone: updateUserDto.phone },
      });

      if (phoneExists) {
        throw new ConflictException('Phone number already exists');
      }
    }

    // Extract permissions from update DTO
    const { permissions, password, ...userDataWithoutPermissions } = updateUserDto;

    try {
      const result = await this.prisma.$transaction(async (prisma) => {
        // Prepare user data
        const userData: any = { ...userDataWithoutPermissions };

        // Hash password if provided
        if (password) {
          userData.password = await bcrypt.hash(password, 10);
        }

        // Update user
        const updatedUser = await prisma.user.update({
          where: { id },
          data: userData,
        });

        // Update permissions if provided
        if (permissions && permissions.length > 0) {
          // Delete existing permissions
          await prisma.permission.deleteMany({
            where: { userId: id },
          });

          // Create new permissions
          await prisma.permission.createMany({
            data: permissions.map(permission => ({
              userId: id,
              name: permission,
            })),
          });
        }

        return updatedUser;
      });

      return {
        message: 'User updated successfully',
        status: 'success',
        data: {
          id: result.id,
          name: result.name,
          email: result.email,
          utype: result.utype,
          status: result.status,
          permissions: permissions || existingUser.permissions.map(p => p.name),
        },
      };
    } catch (error) {
      throw new ConflictException('Failed to update user');
    }
  }

  async getUserWithPermissions(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        permissions: {
          select: {
            name: true,
            createdAt: true,
          }
        }
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return {
      ...user,
      permissions: user.permissions.map(p => p.name),
    };
  }

  async addPermissionToUser(userId: number, permission: PermissionType) {
    // Check if user exists
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });
  
    if (!user) {
      throw new NotFoundException('User not found');
    }
  
    // Check if permission already exists - using unique constraint
    const existingPermission = await this.prisma.permission.findUnique({
      where: {
        userId_name: {  // This is the compound unique constraint name
          userId: userId,
          name: permission
        }
      }
    });
  
    if (existingPermission) {
      throw new ConflictException('Permission already exists for this user');
    }
  
    // Add permission
    await this.prisma.permission.create({
      data: {
        userId: userId,
        name: permission,
      },
    });
  
    return {
      message: 'Permission added successfully',
      status: 'success',
    };
  }

  async removePermissionFromUser(userId: number, permission: PermissionType) {
    // Check if user exists
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Remove permission
    const deletedPermission = await this.prisma.permission.deleteMany({
      where: {
        userId: userId,
        name: permission,
      },
    });

    if (deletedPermission.count === 0) {
      throw new NotFoundException('Permission not found for this user');
    }

    return {
      message: 'Permission removed successfully',
      status: 'success',
    };
  }
}

