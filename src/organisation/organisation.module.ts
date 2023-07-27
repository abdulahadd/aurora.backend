import { Module, forwardRef } from '@nestjs/common';
import { OrgSchema, Organisation } from './models/org.schema';
import { OrganisationController } from './controllers/organisation.controller';
import { OrganisationService } from './services/organisation.service';
import { MongooseModule } from '@nestjs/mongoose';
import { OrgRepository } from './repository/org.repository';

@Module({

  imports: [forwardRef(()=>MongooseModule.forFeature([{name: Organisation.name, schema: OrgSchema}]))],
  controllers: [OrganisationController],
  providers: [OrganisationService, OrgRepository]
})
export class OrganisationModule {}
