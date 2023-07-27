import { Module, forwardRef } from '@nestjs/common';
import { PermissionsController } from './controllers/permissions.controller';
import { PermissionsService } from './services/permissions.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PermissionSchema, Permission } from './models/permissions.schema';
import { PermissionRepository } from './repository/permissions.repository';



@Module({

  imports: [forwardRef(()=>MongooseModule.forFeature([{name: Permission.name, schema: PermissionSchema}]))],
  controllers: [ PermissionsController],
  providers: [PermissionsService, PermissionRepository],
  exports: [PermissionsModule]
})
export class PermissionsModule {}
