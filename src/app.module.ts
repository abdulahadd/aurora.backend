import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { RolesModule } from './roles/roles.module';
import { PermissionsModule } from './permissions/permissions.module';
import { OrganisationModule } from './organisation/organisation.module';
import { EventsModule } from './events/events.module';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [UsersModule, MongooseModule.forRoot('mongodb://localhost/iproject'), AuthModule,  PermissionsModule,RolesModule, OrganisationModule, EventsModule, CommentsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
