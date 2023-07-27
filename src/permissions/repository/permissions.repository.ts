import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { FilterQuery, Model } from 'mongoose';
import { Permission, PermissionDocument } from '../models/permissions.schema';


@Injectable()
export class PermissionRepository {
    constructor(@InjectModel(Permission.name) private permissionModel: Model<PermissionDocument>){}

    async findOne(permissionFilterQuery: FilterQuery<Permission>): Promise<Permission>{
        return this.permissionModel.findOne(permissionFilterQuery);
    }

    async find(userFilterQuery: FilterQuery<Permission>): Promise<Permission[]>{
        return this.permissionModel.find(userFilterQuery);
    }

    async create(permission: Permission): Promise<Permission>{
        const newPermission = new this.permissionModel(permission);
        return newPermission.save();
    }

    async findOneAndUpdate(PermissionFilterQuery: FilterQuery<Permission>, Permission: Partial<Permission>): Promise<Permission>{
        return this.permissionModel.findOneAndUpdate(PermissionFilterQuery, Permission);
    }

}