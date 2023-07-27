import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { FilterQuery, Model } from 'mongoose';
import { Role, RoleDocument } from '../models/role.schema';


@Injectable()
export class RoleRepository {
    constructor(@InjectModel(Role.name) private roleModel: Model<RoleDocument>){}

    async findOne(userFilterQuery: FilterQuery<Role>): Promise<Role>{
        return this.roleModel.findOne(userFilterQuery);
    }

    async find(userFilterQuery: FilterQuery<Role>): Promise<Role[]>{
        return this.roleModel.find(userFilterQuery);
    }

    async create(role: Role): Promise<Role>{
        const newRole = new this.roleModel(role);
        return newRole.save();
    }

    async findOneAndUpdate(roleFilterQuery: FilterQuery<Role>, role: Partial<Role>): Promise<Role>{
        return this.roleModel.findOneAndUpdate(roleFilterQuery, role);
    }

}