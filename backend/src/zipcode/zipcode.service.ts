import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateZipcodeDto } from './dto/create-zipcode.dto';
import { UpdateZipcodeDto } from './dto/update-zipcode.dto';
import { SearchZipcodeDto } from './dto/search-zipcode.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ZipcodeService {
  constructor(
    private prisma: PrismaService,
  ) {}

  async create(createZipcodeDto: CreateZipcodeDto) {
    const { zipcode, userId, subscribePackageId } = createZipcodeDto;

    // Get user to check their limits
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Check if user has reached their ZIP code limit
    const currentZipcodes = user.addedzipcodes || 0;
    const maxZipcodes = user.totalzipcodes || 0;

    if (currentZipcodes >= maxZipcodes) {
      throw new BadRequestException('You have reached your ZIP code limit');
    }

    // Check if ZIP code already exists for this user
    const existingZipcode = await this.prisma.zipCode.findFirst({
      where: {
        userId: userId,
        zipcode: zipcode
      }
    });

    if (existingZipcode) {
      throw new BadRequestException('This ZIP code is already added to your account');
    }

    // Use transaction to ensure both operations succeed
    return this.prisma.$transaction(async (prisma) => {
      // Create the ZIP code
      const newZipcode = await prisma.zipCode.create({
        data: {
          zipcode,
          userId,
        },
      });

      // Update user's addedzipcodes count
      await prisma.user.update({
        where: { id: userId },
        data: {
          addedzipcodes: currentZipcodes + 1,
        },
      });

      return newZipcode;
    });
  }

  async remove(id: string, userId: string) {
    const userIdNum = parseInt(userId);
    const idNum = parseInt(id);

    // First find the ZIP code to ensure it exists and belongs to the user
    const zipcode = await this.prisma.zipCode.findFirst({
      where: {
        id: idNum,
        userId: userIdNum,
      },
    });

    if (!zipcode) {
      throw new NotFoundException('ZIP code not found or you do not have permission to delete it');
    }

    // Get user to update their count
    const user = await this.prisma.user.findUnique({
      where: { id: userIdNum },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Use transaction to ensure both operations succeed
    return this.prisma.$transaction(async (prisma) => {
      // Delete the ZIP code
      const deletedZipcode = await prisma.zipCode.delete({
        where: { id: idNum },
      });

      // Update user's addedzipcodes count
      const currentZipcodes = user.addedzipcodes || 0;
      await prisma.user.update({
        where: { id: userIdNum },
        data: {
          addedzipcodes: Math.max(0, currentZipcodes - 1), // Ensure count doesn't go below 0
        },
      });

      return deletedZipcode;
    });
  }

  findAll() {
    return this.prisma.zipCode.findMany();
  }

  findOne(id: number) {
    return this.prisma.zipCode.findUnique({
      where: { id },
    });
  }

  update(id: number, updateZipcodeDto: UpdateZipcodeDto) {
    return this.prisma.zipCode.update({
      where: { id },
      data: updateZipcodeDto,
    });
  }

  async searchzipCode(searchZipcodeDto: SearchZipcodeDto) {
    const { zipcode } = searchZipcodeDto;
    return this.prisma.zipCode.findMany({
      where: {
        zipcode: {
          contains: zipcode,
        },
        user: {
          status: 'ACTIVE',
        },
      },
      include: {
        user: true,
      },
    });
  }

  async getAllZipcode() {
    return this.prisma.zipCode.findMany({
      include: {
        user: {
          include: {
            gallery: true,
          },
        },
      },
    });
  }
}
