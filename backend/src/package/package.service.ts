import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePackageDto } from './dto/create-package.dto';
import { UpdatePackageDto } from './dto/update-package.dto';
import { StripeService } from '../stripe/stripe.service';

@Injectable()
export class PackageService {
  constructor(
    private prisma: PrismaService,
    private stripeService: StripeService
  ) {}

  async create(createPackageDto: CreatePackageDto) {
    try {
      // Create Stripe product with custom fields
      const stripeProduct = await this.stripeService.createProduct({
        name: createPackageDto.name || 'Package',
        description: createPackageDto.description,
        profiles: createPackageDto.profiles,
        duration: createPackageDto.duration
      });

      // Create Stripe price using the same price from database
      const stripePrice = await this.stripeService.createPrice({
        productId: stripeProduct.id,
        amount: createPackageDto.price, // Same price as database
        interval: 'year',
        intervalCount: createPackageDto.duration
      });

      // Create package in database with Stripe IDs
      const packageData = await this.prisma.package.create({
        data: {
          name: createPackageDto.name,
          price: createPackageDto.price,
          duration: createPackageDto.duration,
          profiles: createPackageDto.profiles,
          description: createPackageDto.description,
          status: createPackageDto.status || 'ACTIVE',
          stripeProductId: stripeProduct.id,
          stripePriceId: stripePrice.id,
          stripePackageId: stripeProduct.id // Using product ID as package ID
        }
      });

      return packageData;
    } catch (error) {
      console.error('Error creating package with Stripe:', error);
      throw new InternalServerErrorException('Failed to create package');
    }
  }

  async findAll() {
    return this.prisma.package.findMany({
     
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
    try {
      const existingPackage = await this.findOne(id);

      // If package has Stripe product ID, update in Stripe
      if (existingPackage.stripeProductId) {
        await this.stripeService.updateProduct(existingPackage.stripeProductId, {
          name: updatePackageDto.name,
          description: updatePackageDto.description,
          active: updatePackageDto.status === 'ACTIVE',
          profiles: updatePackageDto.profiles,
          duration: updatePackageDto.duration
        });

        // If price is being updated, create a new Stripe price
        if (updatePackageDto.price && updatePackageDto.price !== existingPackage.price) {
          const newStripePrice = await this.stripeService.createPrice({
            productId: existingPackage.stripeProductId,
            amount: updatePackageDto.price, // Use the same price as database
            interval: 'year',
            intervalCount: updatePackageDto.duration || existingPackage.duration
          });

          // Update the package with the new Stripe price ID
          return this.prisma.package.update({
            where: { id },
            data: {
              ...updatePackageDto,
              stripePriceId: newStripePrice.id
            }
          });
        }
      }

      return this.prisma.package.update({
        where: { id },
        data: {
          ...updatePackageDto
        }
      });
    } catch (error) {
      console.error('Error updating package with Stripe:', error);
      throw new InternalServerErrorException('Failed to update package');
    }
  }

  async updateStatus(id: number) {
    try {
      const existingPackage = await this.findOne(id);

      // If package has Stripe product ID, deactivate in Stripe
      if (existingPackage.stripeProductId) {
        await this.stripeService.updateProduct(existingPackage.stripeProductId, {
          active: false
        });
      }

      return this.prisma.package.update({
        where: { id },
        data: {
          status: 'INACTIVE'
        }
      });
    } catch (error) {
      console.error('Error updating package status with Stripe:', error);
      throw new InternalServerErrorException('Failed to update package status');
    }
  }
}