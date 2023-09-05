import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { EventsRepository } from '../../repository/event.repository';
import { plainToClass } from 'class-transformer';
import { EventModel } from '../../models/eventModel';
import { UpdateEventDto } from '../../dtos/updateEventDto';
import { Event } from '../../models/eventSchema';

@Injectable()
export class EventsService {
  constructor(private readonly eventRepository: EventsRepository) {}
  async getEvents(): Promise<Event[]> {
    try {
      const events = await this.eventRepository.find({});
      return events.map((event) => plainToClass(Event, event));
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async getEventById(title: string): Promise<any> {
    try {
      const event = await this.eventRepository.findOne({ title });
      if (event) {
        return event;
      } else {
        throw new NotFoundException('User not found');
      }
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async getEventByOrg(orgId: string): Promise<any> {
    try {
      const event = await this.eventRepository.find({ orgId });
      if (event) {
        return event;
      } else {
        throw new NotFoundException('User not found');
      }
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async createEvent(createEvent: EventModel) {
    try {
      return this.eventRepository.create(createEvent);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async updateEvent(
    title: string,
    updateEventDto: UpdateEventDto,
  ): Promise<Event> {
    try {
        const event = await this.eventRepository.findOne({ title });
        if (!event) {
            throw new NotFoundException('User not found');
        }
        return this.eventRepository.findOneAndUpdate({ title }, updateEventDto);
        
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }

  }
}
