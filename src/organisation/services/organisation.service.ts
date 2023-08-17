import { HttpException, HttpStatus, Injectable, UnprocessableEntityException } from '@nestjs/common';
import { OrgRepository } from '../repository/org.repository';
import { Organisation } from '../models/org.schema';
import { OrgModel } from '../models/org.model';
import { UpdateOrgDto } from '../dtos/updateOrganisationDto';

@Injectable()
export class OrganisationService {
    constructor(private readonly orgRepository: OrgRepository){}

    async getOrganisations(): Promise<Organisation[]>{
        const orgs=await this.orgRepository.find({});
        return orgs.map((org)=>org);

    }

    async getOrganisationsById(id: string): Promise<Organisation>{
        const org=await this.orgRepository.findOne({id});
        if(org){
            return org;
        }else{
            throw new HttpException('Organisation not found', HttpStatus.BAD_REQUEST)
        }
    }

    async createOrganisation(orgModel: OrgModel){
        const orgName=orgModel.name;
        const org=await this.orgRepository.findOne({orgName})
        if(org){
            throw new UnprocessableEntityException("User already exists")
        }
        return this.orgRepository.create(orgModel);
    }

    async updateOrganisation(orgId: string, updateOrganisation: UpdateOrgDto){
        const org=await this.orgRepository.findOne({orgId})
        if(!org){
            throw new UnprocessableEntityException("User not found");
        }

        return this.orgRepository.findOneAndUpdate({orgId}, updateOrganisation);
    }

}
