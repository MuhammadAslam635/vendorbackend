import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateMessageDto, MessageType } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { PrismaService } from '../prisma/prisma.service';
@Injectable()
export class MessageService {
    constructor(private prisma: PrismaService) { }
    async create(createMessageDto: CreateMessageDto, userId: number) {
        try {
            // Validate required fields
            if (!createMessageDto.chatId || !createMessageDto.content) {
                throw new BadRequestException('Chat ID and content are required');
            }

            // Check if chat exists
            const chat = await this.prisma.chat.findUnique({
                where: { id: createMessageDto.chatId }
            });

            if (!chat) {
                throw new NotFoundException('Chat not found');
            }

            // Validate attachment URL if provided
            if (createMessageDto.attachments) {
                try {
                    new URL(createMessageDto.attachments);
                } catch (error) {
                    throw new BadRequestException('Invalid attachment URL format');
                }
            }

            const message = await this.prisma.message.create({
                data: {
                    chatId: createMessageDto.chatId,
                    userId: userId,
                    content: createMessageDto.content,
                    attachments: createMessageDto.attachments || null,
                    messageBy: createMessageDto.messageBy || MessageType.USER as any,
                    isRead: createMessageDto.isRead ?? false,
                },
                include: {
                    chat: {
                        select: {
                            id: true,
                            title: true,
                            status: true
                        }
                    }
                }
            });

            // Update chat's updatedAt timestamp
            await this.prisma.chat.update({
                where: { id: createMessageDto.chatId },
                data: { updatedAt: new Date() }
            });

            return {
                status: "success",
                message: "New message has been created.",
                data: message,
            };
        } catch (error) {
            console.error('Message creation error:', error);
            if (error instanceof BadRequestException || error instanceof NotFoundException) {
                throw error;
            }
            throw new BadRequestException('Failed to create message');
        }
    }
    findAll() {
        return `This action returns all message`;
    }

    findOne(id: number) {
        return `This action returns a #${id} message`;
    }

    update(id: number, updateMessageDto: UpdateMessageDto) {
        return `This action updates a #${id} message`;
    }

    remove(id: number) {
        return `This action removes a #${id} message`;
    }
    async notifyMe(id) {
        try {
            // First, get the user and check their type
            const user = await this.prisma.user.findUnique({
                where: {
                    id: id
                }
            });

            if (!user) {
                return {
                    status: "failed",
                    message: "User not found"
                };
            }

            let chats: any[] = [];
            let unreadMessages: Array<{
                chatId: number;
                userId?: number;
                userName?: string;
                adminId?: number;
                adminName?: string;
                unreadCount: number;
                latestMessage: any;
            }> = [];

            // Check user type and get appropriate chats
            if (user.utype === 'admin' || user.utype === 'subadmin') {
                // For admin/subadmin: find chats where they are the admin and status is not closed
                chats = await this.prisma.chat.findMany({
                    where: {
                        AND: [
                            { adminId: id },
                            { status: { not: 'closed' } }
                        ]
                    },
                    include: {
                        messages: {
                            where: {
                                AND: [
                                    { messageBy: 'user' }, // Messages sent by users
                                    { isRead: 0 }           // Unread messages
                                ]
                            },
                            orderBy: {
                                createdAt: 'desc'
                            }
                        },
                        user: true // Include user details for notification
                    }
                });

                // Extract unread messages for notification
                chats.forEach(chat => {
                    if (chat.messages.length > 0) {
                        unreadMessages.push({
                            chatId: chat.id,
                            userId: chat.userId,
                            userName: chat.user?.name || 'Unknown User',
                            unreadCount: chat.messages.length,
                            latestMessage: chat.messages[0] // Most recent message
                        });
                    }
                });

            } else if (user.utype === 'vendor') {
                // For vendor: find chats against their userId and status is not closed
                chats = await this.prisma.chat.findMany({
                    where: {
                        AND: [
                            { userId: id },
                            { status: { not: 'closed' } }
                        ]
                    },
                    include: {
                        messages: {
                            where: {
                                AND: [
                                    { messageBy: 'admin' }, // Messages sent by admin/subadmin
                                    { isRead: false }            // Unread messages
                                ]
                            },
                            orderBy: {
                                createdAt: 'desc'
                            }
                        },
                        admin: true // Include admin details for notification
                    }
                });

                // Extract unread messages for notification
                chats.forEach(chat => {
                    if (chat.messages.length > 0) {
                        unreadMessages.push({
                            chatId: chat.id,
                            adminId: chat.adminId,
                            adminName: chat.admin?.name || 'Admin',
                            unreadCount: chat.messages.length,
                            latestMessage: chat.messages[0] // Most recent message
                        });
                    }
                });

            } else {
                return {
                    status: "failed",
                    message: "Invalid user type for notifications"
                };
            }

            // Return notification data
            return {
                status: "success",
                message: "Notifications retrieved successfully",
                data: {
                    userType: user.utype,
                    totalUnreadChats: unreadMessages.length,
                    totalUnreadMessages: unreadMessages.reduce((total, chat) => total + chat.unreadCount, 0),
                    notifications: unreadMessages
                }
            };

        } catch (e) {
            console.error('Notification Error:', e);
            return {
                status: "failed",
                message: `Get Error: ${e.message}`
            };
        }
    }
}
