import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { MailerService } from '@nestjs-modules/mailer';
import { join } from 'path';
import * as fs from 'fs/promises';
import { ConfigService } from '@nestjs/config';
import { CreateUserDto, PermissionType, RouteType, UserStatus } from './dto/create-user.dto';
import { UpdateAdminUserDto } from './dto/update-admin-user.dto';
import { CsvUserRow } from './dto/csv-import-user.dto';
import * as csv from 'csv-parser';

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
      const backendUrl = this.configService.get<string>('BACKEND_URL') || 'https://coreaeration.com/backend';
      return `${backendUrl}/public/uploads/${subFolder}/${uniqueName}`;
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
        permissions:true,
        routes:true
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
  async getUser(id: number) {
    const user = await this.prisma.user.findUnique({
      where: {id, },
      include: {
        zipcodes: true,
        subscribe_packages: true,
        gallery: true,
        permissions:true,
        routes:true
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

    // if (user.utype !== 'VENDOR') {
    //   throw new ConflictException('Cannot update status for non-vendor users');
    // }

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
        subscribe_packages: true,
        permissions:true,
        routes:true
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
    try {
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
  
      // Validate password
      if (!createUserDto.password || createUserDto.password.length < 6) {
        throw new BadRequestException('Password must be at least 6 characters long');
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
  
      // Extract permissions and routes from DTO
      const { permissions, routes, ...userDataWithoutPermissionsAndRoutes } = createUserDto;
      
      // Set default permissions and routes based on user type
      let userPermissions: PermissionType[] = [];
      let userRoutes: RouteType[] = [];
  
      if (createUserDto.utype === 'ADMIN' || createUserDto.utype === 'SUBADMIN') {
        // For ADMIN and SUBADMIN, use provided permissions or set defaults
        userPermissions = permissions && permissions.length > 0 ? permissions : [PermissionType.APPROVAL];
        userRoutes = routes && routes.length > 0 ? routes : [RouteType.Package]; // Assuming PACKAGES is the correct enum value
        
        // Validate that permissions and routes are provided for ADMIN/SUBADMIN
        if (!permissions || permissions.length === 0) {
          throw new BadRequestException('Admin and Sub Admin users must have at least one permission');
        }
        if (!routes || routes.length === 0) {
          throw new BadRequestException('Admin and Sub Admin users must have at least one route');
        }
      }
      // For VENDOR users, no permissions or routes are needed
  
      // Create user with permissions and routes in a transaction
      const result = await this.prisma.$transaction(async (prisma) => {
        // Create the user
        const newUser = await prisma.user.create({
          data: {
            ...userDataWithoutPermissionsAndRoutes,
            password: hashedPassword,
            email_verification_at: new Date(),
          },
        });
  
        // Create permissions only for ADMIN and SUBADMIN users
        if (userPermissions.length > 0) {
          await prisma.permission.createMany({
            data: userPermissions.map(permission => ({
              userId: newUser.id,
              name: permission,
            })),
            skipDuplicates: true, // Prevents duplicate permission entries
          });
        }
  
        // Create routes only for ADMIN and SUBADMIN users
        if (userRoutes.length > 0) {
          await prisma.route.createMany({
            data: userRoutes.map(route => ({
              userId: newUser.id,
              name: route,
            })),
            skipDuplicates: true, // Prevents duplicate route entries
          });
        }
  
        return newUser;
      });
      const frontendUrl = process.env.FRONTEND_URL || 'https://coreaeration.com/';
    const supportEmail = process.env.SUPPORT_EMAIL || 'meekoslinks@gmail.com';

    this.mailService.sendMail({
        to: createUserDto.email,
        subject: 'Account Created Successfully.',
        template: 'account-created',
        context: {
            name: createUserDto.name || 'Valued Customer',
            loginUrl: `${frontendUrl}/login`,
            packagesUrl: `${frontendUrl}/packages`,
            supportEmail: supportEmail
        }
    });
  
      // Return success response without sensitive data
      return {
        message: 'User created successfully',
        status: 'success',
        data: {
          id: result.id,
          name: result.name,
          email: result.email,
          phone: result.phone,
          utype: result.utype,
          status: result.status,
          permissions: userPermissions,
          routes: userRoutes,
        },
      };
    } catch (error) {
      // Handle specific Prisma errors
      if (error.code === 'P2002') {
        // Unique constraint violation
        throw new ConflictException('User with this email or phone already exists');
      }
      
      // Re-throw known exceptions
      if (error instanceof ConflictException || error instanceof BadRequestException) {
        throw error;
      }
      
      // Handle unexpected errors
      console.error('Error creating user:', error);
      throw new InternalServerErrorException('Failed to create user. Please try again.');
    }
  }

  async updateUser(id: number, updateUserDto: UpdateAdminUserDto) {
    // Check if user exists
    const existingUser = await this.prisma.user.findUnique({
      where: { id },
      include: { permissions: true,
        routes:true
       },
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
    const { routes,permissions, password, ...userDataWithoutPermissionsAndRoutes } = updateUserDto;

    try {
      const result = await this.prisma.$transaction(async (prisma) => {
        // Prepare user data
        const userData: any = { ...userDataWithoutPermissionsAndRoutes };

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
        if (routes && routes.length > 0) {
          // Delete existing permissions
          await prisma.route.deleteMany({
            where: { userId: id },
          });

          // Create new permissions
          await prisma.route.createMany({
            data: routes.map(route => ({
              userId: id,
              name: route,
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
          routes: routes || existingUser.routes.map(p => p.name),
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
  async getAdminUsers() {
    return this.prisma.user.findMany({
      where: {
        OR: [
          { utype: 'ADMIN' },
          { utype: 'SUBADMIN' }
        ]
      },
      include: {
        permissions: {
          select: {
            name: true,
          }
        },
        routes: {
          select: {
            name: true,
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
  }

  async importUsersFromCsv(csvData: CsvUserRow[]) {
    const results: {
      successful: Array<{ row: CsvUserRow; user: any }>;
      failed: Array<{ row: CsvUserRow; error: string }>;
      totalProcessed: number;
    } = {
      successful: [],
      failed: [],
      totalProcessed: csvData.length
    };

    for (const row of csvData) {
      try {
        // Validate required fields
        if (!row.name || !row.email || !row.password || !row.utype) {
          results.failed.push({
            row,
            error: 'Missing required fields: name, email, password, or utype'
          });
          continue;
        }

        // Validate user type
        if (!['ADMIN', 'SUBADMIN'].includes(row.utype)) {
          results.failed.push({
            row,
            error: 'Invalid user type. Must be ADMIN or SUBADMIN'
          });
          continue;
        }

        // Parse permissions and routes
        const permissions = row.permissions 
          ? row.permissions.split(',').map(p => p.trim() as PermissionType)
          : [];
        const routes = row.routes 
          ? row.routes.split(',').map(r => r.trim() as RouteType)
          : [];

        // Validate permissions
        const validPermissions = Object.values(PermissionType);
        const invalidPermissions = permissions.filter(p => !validPermissions.includes(p));
        if (invalidPermissions.length > 0) {
          results.failed.push({
            row,
            error: `Invalid permissions: ${invalidPermissions.join(', ')}`
          });
          continue;
        }

        // Validate routes
        const validRoutes = Object.values(RouteType);
        const invalidRoutes = routes.filter(r => !validRoutes.includes(r));
        if (invalidRoutes.length > 0) {
          results.failed.push({
            row,
            error: `Invalid routes: ${invalidRoutes.join(', ')}`
          });
          continue;
        }

        // Create user DTO
        const createUserDto: CreateUserDto = {
          name: row.name,
          email: row.email,
          phone: row.phone || undefined,
          password: row.password,
          utype: row.utype as any,
          status: (row.status as any) || UserStatus.PENDING,
          permissions: permissions.length > 0 ? permissions : [PermissionType.APPROVAL],
          routes: routes.length > 0 ? routes : [RouteType.Package]
        };

        // Create the user
        const result = await this.createUser(createUserDto);
        results.successful.push({
          row,
          user: result.data
        });

      } catch (error) {
        results.failed.push({
          row,
          error: error.message || 'Unknown error occurred'
        });
      }
    }

    return {
      message: `CSV import completed. ${results.successful.length} users created successfully, ${results.failed.length} failed.`,
      status: 'success',
      data: results
    };
  }

  parseCsvData(csvContent: string): Promise<CsvUserRow[]> {
    return new Promise((resolve, reject) => {
      const results: CsvUserRow[] = [];
      const stream = require('stream');
      const readable = new stream.Readable();
      readable.push(csvContent);
      readable.push(null);

      readable
        .pipe(csv())
        .on('data', (data) => {
          results.push(data);
        })
        .on('end', () => {
          resolve(results);
        })
        .on('error', (error) => {
          reject(error);
        });
    });
  }
}

