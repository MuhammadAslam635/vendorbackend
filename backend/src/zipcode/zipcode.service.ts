import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateZipcodeDto } from './dto/create-zipcode.dto';
import { UpdateZipcodeDto } from './dto/update-zipcode.dto';
import { SearchZipcodeDto } from './dto/search-zipcode.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ZipcodeService {
  constructor(
    private prisma: PrismaService,
  ) {}
  create(createZipcodeDto: CreateZipcodeDto) {
    return this.prisma.zipCode.create({
      data: {
        zipcode: createZipcodeDto.zipcode,
        userId: createZipcodeDto.userId,
      },
    });
  }

  findAll() {
    return `This action returns all zipcode`;
  }

  findOne(id: number) {
    return `This action returns a #${id} zipcode`;
  }

  update(id: number, updateZipcodeDto: UpdateZipcodeDto) {
    return `This action updates a #${id} zipcode`;
  }

  remove(id: number) {
    return `This action removes a #${id} zipcode`;
  }
  async searchzipCode(searchZipcodeDto: SearchZipcodeDto) {
    try {
      const { zipcode } = searchZipcodeDto;
      console.log(`Searching for zipcode: ${zipcode}`);

      // Return empty array if search is empty or undefined
      if (!zipcode || zipcode.trim() === '') {
        return [];
      }

      // Clean up the search term
      const searchTerm = zipcode.trim();

      // Query the database for matching zipcodes
      const results = await this.prisma.zipCode.findMany({
        where: {
          zipcode: {
            startsWith: searchTerm,
          },
        },
        include: {
          user: true,
        },
        orderBy: {
          zipcode: 'asc',
        },
        take: 10, // Limit results to 10
      });

      console.log(`Found ${results.length} active users for zipcode search: ${searchTerm}`);
      return results;

    } catch (error) {
      console.log(`Error searching for zipcode: ${error.message}`, error.stack);
      throw new BadRequestException('Failed to search zipcode');
    }
  }
  async getAllZipcode() {
    return this.prisma.zipCode.findMany({
      include: {
        user: true,
      },
    });
  }
}
