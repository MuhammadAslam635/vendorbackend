import { Injectable } from '@nestjs/common';
import { CreateSubscribepackageDto } from './dto/create-subscribepackage.dto';
import { UpdateSubscribepackageDto } from './dto/update-subscribepackage.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SubscribepackageService {
  constructor(private readonly prisma: PrismaService) {}
  create(createSubscribepackageDto: CreateSubscribepackageDto) {
    return 'This action adds a new subscribepackage';
  }

  findAll() {
    return `This action returns all subscribepackage`;
  }

  findOne(id: number) {
    return `This action returns a #${id} subscribepackage`;
  }

  update(id: number, updateSubscribepackageDto: UpdateSubscribepackageDto) {
    return `This action updates a #${id} subscribepackage`;
  }

  remove(id: number) {
    return `This action removes a #${id} subscribepackage`;
  }
  async getUserPackage(userId: number) {
    return this.prisma.subscribePackage.findFirst({
      where: {
        userId: userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}
