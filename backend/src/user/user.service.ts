import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService,
    private mailService: MailerService
  ) { }

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

  async create(email: string, password: string, name: string = email.split('@')[0]) {
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
      },
    });
  }
  async getUser(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: parseInt(id) },
      include: {
        profiles: true,
        subscribe_packages: true
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
        profiles: true,
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
        profiles: true
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
        profiles: true
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
        profiles: true
      }
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    // Delete user and associated vendor data in a transaction
    return this.prisma.$transaction(async (prisma) => {
      if (user.profiles) {
        await prisma.vendorProfile.deleteMany({
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

