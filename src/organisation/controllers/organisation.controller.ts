import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { OrganisationService } from '../services/organisation.service';
import { UpdateOrgDto } from '../dtos/updateOrganisationDto';
import { Organisation } from '../models/org.schema';
import { OrgModel } from '../models/org.model';

@Controller('org')
export class OrganisationController {
    constructor(private readonly orgService: OrganisationService){}

    @Get('')
    async getOrganisations(): Promise<Organisation[]>{
        return this.orgService.getOrganisations();

    }

    @Get(':id')
    getOne(@Param('id') orgId: string ): Promise<Organisation>{
        return this.orgService.getOrganisationsById(orgId);
    }

    @Post('')
    createOrganisation(@Body() org: OrgModel){
        return this.orgService.createOrganisation(org);

    }

    @Patch(':id')
    updateOrganisation(@Param('id') orgId: string, @Body() org: UpdateOrgDto): Promise<Organisation>{
        return this.orgService.updateOrganisation(orgId, org);

    }
}
