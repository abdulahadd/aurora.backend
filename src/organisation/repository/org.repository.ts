import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { Organisation ,OrgDocument } from '../models/org.schema';


@Injectable()
export class OrgRepository {
    constructor(@InjectModel(Organisation.name) private orgModel: Model<OrgDocument>){}

    async findOne(orgFilterQuery: FilterQuery<Organisation>): Promise<Organisation>{
        return this.orgModel.findOne(orgFilterQuery);
    }

    async find(orgFilterQuery: FilterQuery<Organisation>): Promise<Organisation[]>{
        return this.orgModel.find(orgFilterQuery);
    }

    async create(org: Organisation): Promise<Organisation>{
        const newRole = new this.orgModel(org);
        return newRole.save();
    }

    async findOneAndUpdate(orgFilterQuery: FilterQuery<Organisation>, org: Partial<Organisation>): Promise<Organisation>{
        return this.orgModel.findOneAndUpdate(orgFilterQuery, org);
    }

}