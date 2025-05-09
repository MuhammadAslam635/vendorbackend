import { Injectable } from '@nestjs/common';
import { CreateSubscribepackageDto } from './dto/create-subscribepackage.dto';
import { UpdateSubscribepackageDto } from './dto/update-subscribepackage.dto';
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
      },
    });
  }
}
