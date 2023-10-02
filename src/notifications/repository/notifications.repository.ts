import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { Notification, NotificationDocument } from '../models/notSchema';
// Import your notification schema/model

@Injectable()
export class NotificationsRepository {
  constructor(
    @InjectModel(Notification.name) private notificationModel: Model<NotificationDocument>,
  ) {}

  async findOne(notificationFilterQuery: FilterQuery<Notification>): Promise<Notification> {
    try {
      return this.notificationModel.findOne(notificationFilterQuery).lean();
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async findPage(notificationFilterQuery: FilterQuery<Notification>, page: number, limit: number): Promise<Notification[]> {
    try {
      const skip = (page - 1) * limit;
      return this.notificationModel.find(notificationFilterQuery).lean().skip(skip)
      .limit(limit)
      .exec();
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async find(notificationFilterQuery: FilterQuery<Notification>): Promise<Notification[]> {
    try {
      return this.notificationModel.find(notificationFilterQuery).lean()
      
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async create(notification: Notification): Promise<Notification> {
    try {
      const newNotification = new this.notificationModel(notification);
      return newNotification.save();
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async findOneAndUpdate(
    notificationFilterQuery: FilterQuery<Notification>,
    notification: Partial<Notification>,
  ): Promise<Notification> {
    try {
      return this.notificationModel.findOneAndUpdate(notificationFilterQuery, notification);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}