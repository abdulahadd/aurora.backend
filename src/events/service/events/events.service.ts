import { HttpException, HttpStatus, Injectable, UnprocessableEntityException } from '@nestjs/common';
import { EventsRepository } from '../../repository/event.repository';
import { plainToClass } from 'class-transformer';
import { EventModel } from '../../models/eventModel';
import { UpdateEventDto } from '../../dtos/updateEventDto';
import { Event } from '../../models/eventSchema';

@Injectable()
export class EventsService {
    constructor(private readonly eventRepository: EventsRepository){}
    async getEvents(): Promise<Event[]>{
        const events=await this.eventRepository.find({});
        return events.map((event)=> plainToClass(Event, event));
    }

    async getEventById(Id: string): Promise<any>{
        const event= await this.eventRepository.findOne({Id});
        if(event)
        {
            return event;
        }
        else{
            throw new HttpException('User not found', HttpStatus.BAD_REQUEST)
        }
        
    }

    async createEvent(createEvent: EventModel){
        return this.eventRepository.create(createEvent);
    }


    async updateEvent(Id: string ,updateEventDto: UpdateEventDto): Promise<Event>{
        const event=await this.eventRepository.findOne({Id});
        if(!event)
        {
            throw new UnprocessableEntityException("User Not Found");
        }

        return this.eventRepository.findOneAndUpdate({Id}, updateEventDto);
    }



}
