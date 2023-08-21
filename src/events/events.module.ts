import { Module, forwardRef } from '@nestjs/common';
import { EventsController } from './controller/events/events.controller';
import { EventsService } from './service/events/events.service';
import { MongooseModule } from '@nestjs/mongoose';
import { EventSchema } from './models/eventSchema';
import { EventsRepository } from './repository/event.repository';

@Module({
  imports: [forwardRef(()=>MongooseModule.forFeature([{name: Event.name, schema: EventSchema}]))],
  controllers: [EventsController],
  providers: [EventsService, EventsRepository],
  exports: [EventsModule]

})
export class EventsModule {}
