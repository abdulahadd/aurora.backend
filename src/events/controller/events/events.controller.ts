import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { EventsService } from '../../service/events/events.service';
import { Event } from '../../models/eventSchema';
import { EventModel } from '../../models/eventModel';
import { UpdateEventDto } from '../../dtos/updateEventDto';

@Controller('events')
export class EventsController {
    constructor(private readonly eventService: EventsService){}

    @Get('/all')
    async getEvents(): Promise<Event[]>{
        return this.eventService.getEvents();
    }

    @Get('/:id')
    async getUserByUsername(@Param('id') Id: string): Promise<Event>{
        const  event= await this.eventService.getEventById(Id);
        return event;
    }

    @Post('')
    async createEvent(@Body() event: EventModel): Promise<Event>{
        return this.eventService.createEvent(event);
    }
    
    @Patch('/patch/:title/')
    async updateUser(@Param('title') Id: string, @Body() updateEventDto: UpdateEventDto): Promise<Event>{
        console.log(Id);
        return this.eventService.updateEvent(Id, updateEventDto);
    }
}
