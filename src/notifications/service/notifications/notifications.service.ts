import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { NotificationsRepository } from '../../repository/notifications.repository';
import { Notification } from '../../models/notSchema';
import { NotificationDto } from '../../dtos/notificationDto';


@Injectable()
export class NotificationsService {
  constructor(private readonly notificationRepository: NotificationsRepository) {}

  async getNotifications(): Promise<Notification[]> {
    try {
      const notifications = await this.notificationRepository.find({});
      return notifications;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async getNotificationById(_id: string): Promise<Notification> {
    try {
      const notification = await this.notificationRepository.findOne({ _id });
      if (notification) {
        return notification;
      } else {
        throw new NotFoundException('Notification not found');
      }
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async createNotification(createNotificationDto: Notification): Promise<Notification> {
    try {
      return this.notificationRepository.create(createNotificationDto);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async updateNotification(_id: string, updateNotificationDto: NotificationDto): Promise<Notification> {
    try {
      const notification = await this.notificationRepository.findOne({ _id });
      if (!notification) {
        throw new NotFoundException('Notification not found');
      }
      return this.notificationRepository.findOneAndUpdate({ _id }, updateNotificationDto);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async markNotificationAsRead(_id: string, userId: string): Promise<Notification> {
    const notification = await this.notificationRepository.findOne({_id});
    if (!notification) {
      throw new NotFoundException('Notification not found');
    }

    // Mark the notification as read for the specified user
    notification.viewedBy[userId] = true;
    
    return notification.save();
  }
}

