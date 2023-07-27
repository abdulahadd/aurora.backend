import { Module, forwardRef } from '@nestjs/common';
import { RoleController } from './controllers/role.controller';
import { RoleService } from './services/role.service';

import { MongooseModule } from '@nestjs/mongoose';
import { Role, RoleSchema } from './models/role.schema';
import { RoleRepository } from './repository/role.repository';

@Module({

  imports: [forwardRef(()=>MongooseModule.forFeature([{name: Role.name, schema: RoleSchema }]))],
  controllers: [RoleController],
  providers: [RoleService, RoleRepository],
  exports:[RolesModule],
})
export class RolesModule {}
