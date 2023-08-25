import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { EventsService } from '../../service/events/events.service';
import { Event } from '../../models/eventSchema';
import { EventModel } from '../../models/eventModel';
import { UpdateEventDto } from '../../dtos/updateEventDto';

@Controller('events')
export class EventsController {
  constructor(private readonly eventService: EventsService) {}

  @Get('')
  async getEvents(): Promise<Event[]> {
    try {
      return this.eventService.getEvents();
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Get('/:id')
  async getUserByUsername(@Param('id') Id: string): Promise<Event> {
    try {
      const event = await this.eventService.getEventById(Id);
      return event;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Post('')
  async createEvent(@Body() event: EventModel): Promise<Event> {
    try {
      return this.eventService.createEvent(event);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Patch('/:title')
  async updateUser(
    @Param('title') Id: string,
    @Body() updateEventDto: UpdateEventDto,
  ): Promise<Event> {
    try {
      return this.eventService.updateEvent(Id, updateEventDto);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
