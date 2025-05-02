import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UpdateStatusDto } from './dto/update-status.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getProfile(@Request() req) {
    const user = await this.userService.getUser(req.user.userId);
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
  @Get("/")
  async getAllUsers() {
    return this.userService.getAllUsers();
  }
  @Patch(':id/status')
  async updateStatus(
    @Param('id') id: string,
    @Body() updateStatusDto: UpdateStatusDto
  ) {
    return this.userService.updateStatus(+id, updateStatusDto.status);
  }
  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(+id);
  }
  @Get(':id')
  async getUser(@Param('id') id: string) {
    return this.userService.getUser(+id);
  }

}