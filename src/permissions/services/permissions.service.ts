import { HttpException, HttpStatus, Injectable, UnprocessableEntityException } from '@nestjs/common';
import { PermissionRepository } from '../repository/permissions.repository';
import { Permission } from '../models/permissions.schema';
import { PermissionModel } from '../models/permissions.model';
import { UpdatePermissionDto } from '../dtos/updatePermissionDto';

@Injectable()
export class PermissionsService {

    constructor(private readonly permissionRepository: PermissionRepository){}

    async getPermissions(): Promise<Permission[]>{
        const permissions=await this.permissionRepository.find({});
        console.log(permissions);
        return permissions.map((permission)=>permission);

    }

    async getPermissionsById(id: string): Promise<Permission>{
        const permission=await this.permissionRepository.findOne({id});
        if(permission){
            return permission;
        }else{
            throw new HttpException('Permission not found', HttpStatus.BAD_REQUEST)
        }
    }

    async createPermission(permissionModel: PermissionModel){
        const permissionName=permissionModel.name;
        const permission=await this.permissionRepository.findOne({permissionName})
        if(permission){
            throw new UnprocessableEntityException("User already exists")
        }
        return this.permissionRepository.create(permissionModel);
    }

    async updatePermission(PermissionId: string, updatePermission: UpdatePermissionDto){
        const Permission=await this.permissionRepository.findOne({PermissionId})
        if(!Permission){
            throw new UnprocessableEntityException("User not found");
        }

        return this.permissionRepository.findOneAndUpdate({PermissionId}, updatePermission);
    }


}
