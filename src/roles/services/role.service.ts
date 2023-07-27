import { HttpException, HttpStatus, Injectable, UnprocessableEntityException } from '@nestjs/common';
import { RoleRepository } from '../repository/role.repository';
import { Role } from '../models/role.schema';
import { RoleModel } from '../models/role.model';
import { UpdateRoleDto } from '../dtos/updateRoleDto';

@Injectable()
export class RoleService {
    constructor(private readonly roleRepository: RoleRepository){}

    async getRoles(): Promise<Role[]>{
        const roles=await this.roleRepository.find({});
        console.log(roles);
        return roles.map((role)=>role);

    }

    async getRolesById(id: string): Promise<Role>{
        const role=await this.roleRepository.findOne({id});
        if(role){
            return role;
        }else{
            throw new HttpException('Role not found', HttpStatus.BAD_REQUEST)
        }
    }

    async createRole(roleModel: RoleModel){
        const roleName=roleModel.name;
        const role=await this.roleRepository.findOne({roleName})
        if(role){
            throw new UnprocessableEntityException("User already exists")
        }
        return this.roleRepository.create(roleModel);
    }

    async updateRole(roleId: string, updateRole: UpdateRoleDto){
        const role=await this.roleRepository.findOne({roleId})
        if(!role){
            throw new UnprocessableEntityException("User not found");
        }

        return this.roleRepository.findOneAndUpdate({roleId}, updateRole);
    }


}
