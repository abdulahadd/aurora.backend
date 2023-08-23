import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { FilterQuery, Model } from 'mongoose';
import { Event, EventDocument } from '../models/eventSchema';

@Injectable()
export class EventsRepository {
  constructor(
    @InjectModel(Event.name) private eventModel: Model<EventDocument>,
  ) {}

  async findOne(eventFilterQuery: FilterQuery<Event>): Promise<Event> {
    try {
      return this.eventModel.findOne(eventFilterQuery).lean();
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async find(eventFilterQuery: FilterQuery<Event>): Promise<Event[]> {
    try {
      return this.eventModel.find(eventFilterQuery).lean();
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async create(event: Event): Promise<Event> {
    try {
      const newEvent = new this.eventModel(event);
      return newEvent.save();
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async findOneAndUpdate(
    eventFilterQuery: FilterQuery<Event>,
    event: Partial<Event>,
  ): Promise<Event> {
    try {
        return this.eventModel.findOneAndUpdate(eventFilterQuery, event);
      } catch (error) {
        throw new HttpException(error.message, error.status);
      }
  }
}
