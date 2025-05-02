import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { PackageService } from './package.service';
import { CreatePackageDto } from './dto/create-package.dto';
import { UpdatePackageDto } from './dto/update-package.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles-guard';
import { UserRole } from 'src/types/user-role.enum';
import { Roles } from 'src/types/roles.decorator';

@Controller('packages') // Changed from 'package' to 'packages' to match frontend URL
@UseGuards(JwtAuthGuard)
export class PackageController {
  constructor(private readonly packageService: PackageService) {}

  @Post()
  async create(@Request() req, @Body() createPackageDto: CreatePackageDto) {
    console.log('Create package request from:', req.user);
    return this.packageService.create(createPackageDto);
  }

  @Get()
  async findAll(@Request() req) {
    console.log('User in findAll:', req.user); // Debug log
    return this.packageService.findAll();
  }

  @Get(':id')
  async findOne(@Request() req, @Param('id') id: string) {
    console.log('User in findOne:', req.user); // Debug log
    return this.packageService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Request() req,
    @Param('id') id: string, 
    @Body() updatePackageDto: UpdatePackageDto
  ) {
    console.log('User in update:', req.user); // Debug log
    return this.packageService.update(+id, updatePackageDto);
  }

  @Delete(':id')
  async remove(@Request() req, @Param('id') id: string) {
    console.log('User in remove:', req.user); // Debug log
    return this.packageService.remove(+id);
  }
}