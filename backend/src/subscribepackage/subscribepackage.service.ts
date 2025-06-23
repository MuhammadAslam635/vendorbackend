import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SubscribepackageService {
  constructor(private readonly prisma: PrismaService) {}
  
  async getUserPackage(userId: number) {
    return this.prisma.subscribePackage.findFirst({
      where: {
        userId: userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        package: true,
        transaction: true,
        user: true,
        zipCodes: true, // Ensure this matches the schema
      },
    });
  }
  
  async getUserAllPackages(userId: number) {
    return this.prisma.subscribePackage.findMany({
      where: {
        userId: userId,
      },
      include: {
        zipCodes: true, // Ensure this matches the schema
      },
    });
  }
}
