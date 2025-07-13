import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePromoDto, PromoResponseDto } from './dto/create-promo.dto';
import { UpdatePromoDto } from './dto/update-promo.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PromoService {
  constructor(private prisma: PrismaService) { }

  async create(createPromoDto: CreatePromoDto){
    const { startDate, endDate, code, maxZipCode, ...rest } = createPromoDto;

    // Validate dates
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (start >= end) {
      throw new BadRequestException('Start date must be before end date');
    }

    if (start < new Date()) {
      throw new BadRequestException('Start date cannot be in the past');
    }

    // Check if promo code already exists
    const existingPromo = await this.prisma.promo.findUnique({
      where: { code }
    });

    if (existingPromo) {
      throw new ConflictException('Promo code already exists');
    }

    // Prepare data with proper type handling
    const createData: any = {
      ...rest,
      code,
      startDate: start,
      endDate: end
    };

    // Only add maxZipCode if it's provided
    if (maxZipCode !== undefined) {
      createData.maxZipCode = maxZipCode;
    }

    const promo = await this.prisma.promo.create({
      data: createData
    });

    return {
      status:"success",
      message:"Promo has been created",
      data:promo
    };
  }

  async findAll() {
    const [promos, total] = await Promise.all([
      this.prisma.promo.findMany({
        include: {
          creator: true
        }
      }),
      this.prisma.promo.count()
    ]);

    return { 
      status:"success",
      message:"All Promos",
      data: promos
    };
  }

  async findOne(id: number) {
    const promo = await this.prisma.promo.findUnique({
      where: { id },
      include: {
        creator: true
      }
    });

    if (!promo) {
      throw new NotFoundException('Promo not found');
    }

    return promo;
  }

  async update(id: number, updatePromoDto: UpdatePromoDto) {
    const existingPromo = await this.prisma.promo.findUnique({
      where: { id }
    });

    if (!existingPromo) {
      throw new NotFoundException('Promo not found');
    }

    const { startDate, endDate, code, maxZipCode, ...rest } = updatePromoDto;

    // Validate dates if provided
    if (startDate || endDate) {
      const start = startDate ? new Date(startDate) : existingPromo.startDate;
      const end = endDate ? new Date(endDate) : existingPromo.endDate;
      
      if (start >= end) {
        throw new BadRequestException('Start date must be before end date');
      }
    }

    // Check if promo code already exists (if updating code)
    if (code && code !== existingPromo.code) {
      const existingCode = await this.prisma.promo.findUnique({
        where: { code }
      });

      if (existingCode) {
        throw new ConflictException('Promo code already exists');
      }
    }

    const updateData: any = { ...rest };
    
    if (code) updateData.code = code;
    if (startDate) updateData.startDate = new Date(startDate);
    if (endDate) updateData.endDate = new Date(endDate);
    if (maxZipCode !== undefined) updateData.maxZipCode = maxZipCode;

    const promo = await this.prisma.promo.update({
      where: { id },
      data: updateData,
    });

    return promo;
  }

  async remove(id: number): Promise<{ message: string }> {
    const promo = await this.prisma.promo.findUnique({
      where: { id }
    });

    if (!promo) {
      throw new NotFoundException('Promo not found');
    }

    await this.prisma.promo.delete({
      where: { id }
    });

    return { message: 'Promo deleted successfully' };
  }

  async toggleStatus(id: number) {
    const promo = await this.prisma.promo.findUnique({
      where: { id }
    });

    if (!promo) {
      throw new NotFoundException('Promo not found');
    }

    const updatedPromo = await this.prisma.promo.update({
      where: { id },
      data: { isActive: !promo.isActive },
      include: {
        creator: {
          select: {
            id: true,
            name: true,
            email: true,
          }
        }
      }
    });

    return updatedPromo;
  }

  async getActivePromos() {
    const now = new Date();
    
    return this.prisma.promo.findMany({
      where: {
        isActive: true,
        startDate: { lte: now },
        endDate: { gte: now },
      }
    });
  }

  async validatePromoCode(code: string, userId?: number, amount?: number) {
    const now = new Date();
    
    const promo = await this.prisma.promo.findUnique({
      where: { code },
      include: {
        creator: {
          select: {
            id: true,
            name: true,
            email: true,
          }
        }
      }
    });

    if (!promo) {
      throw new NotFoundException('Invalid promo code');
    }

    if (!promo.isActive) {
      throw new BadRequestException('Promo code is not active');
    }

    if (promo.startDate > now) {
      throw new BadRequestException('Promo code is not yet valid');
    }

    if (promo.endDate < now) {
      throw new BadRequestException('Promo code has expired');
    }


    return promo;
  }
}