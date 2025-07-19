import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, Req, Put } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AddAdminDto } from './dto/add-admin.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
@UseGuards(JwtAuthGuard)
@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) { }

  @Post()
  async create(@Request() req, @Body() createChatDto: CreateChatDto) {
    const userId = req.user.userId;
    if (userId) {
      return this.chatService.create(createChatDto);
    } else {
      return {
        status: 'error',
        message: 'User ID not found in request',
      }
    }
  }

  @Get()
  async findAll(@Request() req) {
    const userId = req.user.userId;
    return this.chatService.findAll(userId);
  }

  @Get(':id')
  findOne(@Request() req, @Param('id') id: string) {
    console.log("caht Id", id);
    return this.chatService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateChatDto: UpdateChatDto) {
    return this.chatService.update(+id, updateChatDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chatService.remove(+id);
  }
  @Put('/update/:id')
  updateAdmin(@Param('id') id: string, @Body() addAdminDeto: AddAdminDto) {
    const chatId = id;
    if (!chatId) {
      return {
        status: 'error',
        message: 'Chat ID is required',
      };
    }
     return this.chatService.assignAdmin(+chatId,addAdminDeto);
  }
  @Patch('/update/status/:id')
  updateStatus(@Param('id') id: string, @Body() updateStatusDto:UpdateStatusDto){
    const chatId = id;
    if (!chatId) {
      return {
        status: 'error',
        message: 'Chat ID is required',
      };
    }
    return this.chatService.updateStatus(+chatId, updateStatusDto);
  }
}
