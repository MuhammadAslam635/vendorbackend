import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePromoDto, PromoResponseDto } from './dto/create-promo.dto';
import { UpdatePromoDto } from './dto/update-promo.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as moment from 'moment-timezone';

@Injectable()
export class PromoService {
  constructor(private prisma: PrismaService) { }

  async create(createPromoDto: CreatePromoDto){
    const { startDate, endDate, code, maxZipCode, ...rest } = createPromoDto;

    // Convert dates to Central Time Zone
    const start = moment.tz(startDate, 'America/Chicago').toDate();
    const end = moment.tz(endDate, 'America/Chicago').toDate();
    
    if (start >= end) {
      throw new BadRequestException('Start date must be before end date');
    }

    // Compare with current time in Central Time Zone
    const nowCT = moment.tz('America/Chicago').toDate();
    if (start < nowCT) {
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
      const start = startDate ? moment.tz(startDate, 'America/Chicago').toDate() : existingPromo.startDate;
      const end = endDate ? moment.tz(endDate, 'America/Chicago').toDate() : existingPromo.endDate;
      
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
    if (startDate) updateData.startDate = moment.tz(startDate, 'America/Chicago').toDate();
    if (endDate) updateData.endDate = moment.tz(endDate, 'America/Chicago').toDate();
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
    const nowCT = moment.tz('America/Chicago').toDate();
    
    return this.prisma.promo.findMany({
      where: {
        isActive: true,
        endDate: { gte: nowCT },
      }
    });
  }

  async validatePromoCode(code: string) {
    const nowCT = moment.tz('America/Chicago').toDate();
    
    const promo = await this.prisma.promo.findUnique({
      where: { code }
    });

    if (!promo) {
      throw new NotFoundException('Invalid promo code');
    }

    if (!promo.isActive) {
      throw new BadRequestException('Promo code is not active');
    }

    if (promo.startDate > nowCT) {
      throw new BadRequestException('Promo code is not yet valid');
    }

    if (promo.endDate < nowCT) {
      throw new BadRequestException('Promo code has expired');
    }


    return promo;
  }
}