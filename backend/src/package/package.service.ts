import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePackageDto } from './dto/create-package.dto';
import { UpdatePackageDto } from './dto/update-package.dto';

@Injectable()
export class PackageService {
  constructor(private prisma: PrismaService) {}

  async create(createPackageDto: CreatePackageDto) {
    return this.prisma.package.create({
      data: {
        name: createPackageDto.name,
        price: createPackageDto.price,
        duration: createPackageDto.duration,
        status: createPackageDto.status || 'ACTIVE'
      }
    });
  }

  async findAll() {
    return this.prisma.package.findMany({
      where: {
        status: 'ACTIVE'
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
  }

  async findOne(id: number) {
    const pack = await this.prisma.package.findUnique({
      where: { id }
    });

    if (!pack) {
      throw new NotFoundException(`Package with ID ${id} not found`);
    }

    return pack;
  }

  async update(id: number, updatePackageDto: UpdatePackageDto) {
    // Check if package exists
    await this.findOne(id);

    return this.prisma.package.update({
      where: { id },
      data: {
        ...updatePackageDto
      }
    });
  }

  async remove(id: number) {
    // Check if package exists
    await this.findOne(id);

    // Soft delete by updating status to INACTIVE
    return this.prisma.package.update({
      where: { id },
      data: {
        status: 'INACTIVE'
      }
    });
  }
}