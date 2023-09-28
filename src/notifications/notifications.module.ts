import { Module, forwardRef } from '@nestjs/common';
import { NotificationsController } from './controller/notifications/notifications.controller';
import { NotificationsService } from './service/notifications/notifications.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Notification, NotificationSchema } from './models/notSchema';
import { NotificationsRepository } from './repository/notifications.repository';

@Module({
  imports: [forwardRef(()=>MongooseModule.forFeature([{name: Notification.name, schema: NotificationSchema}]))],
  controllers: [NotificationsController],
  providers: [NotificationsService, NotificationsRepository],
  exports: [NotificationsModule]
})
export class NotificationsModule {}
