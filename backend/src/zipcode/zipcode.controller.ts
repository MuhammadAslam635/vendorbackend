import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Request } from '@nestjs/common';
import { ZipcodeService } from './zipcode.service';
import { CreateZipcodeDto } from './dto/create-zipcode.dto';
import { UpdateZipcodeDto } from './dto/update-zipcode.dto';
import { SearchZipcodeDto } from './dto/search-zipcode.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('zipcode')
export class ZipcodeController {
  constructor(
    private readonly zipcodeService: ZipcodeService,
  ) {}
 @UseGuards(JwtAuthGuard)
  @Post()
  create(@Request() req, @Body() createZipcodeDto: CreateZipcodeDto) {
    const userId = req.user.userId;
    return this.zipcodeService.create({...createZipcodeDto, userId});
  }

  @Get()
  findAll() {
    return this.zipcodeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.zipcodeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateZipcodeDto: UpdateZipcodeDto) {
    return this.zipcodeService.update(+id, updateZipcodeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.zipcodeService.remove(+id);
  }
  @Get("/search/profile")
  async searchZipcode(@Query() searchZipcodeDto: SearchZipcodeDto) {
    console.log("searchZipcodeDto",searchZipcodeDto);
    return this.zipcodeService.searchzipCode(searchZipcodeDto);
  }
  @Get("/all/profile")
  async getAllZipcode() {
    return this.zipcodeService.getAllZipcode();
  }
}
