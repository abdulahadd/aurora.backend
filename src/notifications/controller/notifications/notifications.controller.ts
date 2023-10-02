import { Controller, Get, Post, Param, Body, Put, HttpException, Patch, Query } from '@nestjs/common';
import { NotificationsService } from '../../service/notifications/notifications.service';
import { NotificationDto, UpdateNotificationDto } from '../../dtos/notificationDto';
import { Notification } from '../../models/notSchema';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}


  @Get()
  async getNotifications() {
    try {
      const notifications = await this.notificationsService.getNotifications();
      return notifications;
    } catch (error) {
        throw new HttpException(error.message, error.status);
    }
  }

  @Get(':id')
  async getNotificationById(@Param('id') id: string) {
    try {
      const notification = await this.notificationsService.getNotificationById(
        id,
      );
      return notification;
    } catch (error) {
        throw new HttpException(error.message, error.status);
    }
  }

  @Get('user/:userId')
  async getNotificationsForUser(
    @Param('userId') userId: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    try {
      const notifications = await this.notificationsService.getNotificationsForUser(
        userId,
        page,
        limit,
      );
      return notifications;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Post()
  async createNotification(@Body() createNotificationDto: Notification) {
    try {
      const notification = await this.notificationsService.createNotification(
        createNotificationDto,
      );
      return notification;
    } catch (error) {
        throw new HttpException(error.message, error.status);
    }
  }

  @Patch(':id')
  async updateNotification(
    @Param('id') id: string,
    @Body() updateNotificationDto: UpdateNotificationDto,
  ) {
    try {
      const updatedNotification = await this.notificationsService.updateNotification(id, updateNotificationDto);
      return updatedNotification;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Put('read/:id')
  async markNotificationAsRead(
    @Param('id') id: string,
    @Body('userId') userId: string,
  ) {
    try {
      const updatedNotification =
        await this.notificationsService.markNotificationAsRead(id, userId);
      return updatedNotification;
    } catch (error) {
        throw new HttpException(error.message, error.status);
    }
  }

  @Get('/unread/:userId')
  async getUnreadNotifications(@Param('userId') userId: string) {
    try {
      const unreadNotifications =
        await this.notificationsService.getUnreadNotifications(userId);
      return unreadNotifications;
    } catch (error) {
        throw new HttpException(error.message, error.status);
    }
  }
}
