import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { Role } from '../models/role.schema';
import { RoleService } from '../services/role.service';
import { RoleModel } from '../models/role.model';
import { UpdateRoleDto } from '../dtos/updateRoleDto';

@Controller('roles')
export class RoleController {
    constructor(private readonly roleService: RoleService){}

    @Get('')
    async getRoles(): Promise<Role[]>{
        return this.roleService.getRoles();

    }

    @Get(':id')
    getOne(@Param('id') roleId: string ): Promise<Role>{
        console.log("id", roleId);
        return this.roleService.getRolesById(roleId);
    }

    @Post('')
    createRole(@Body() role: RoleModel){
        return this.roleService.createRole(role);

    }

    @Patch(':id')
    updateRole(@Param('id') roleId: string, @Body() role: UpdateRoleDto): Promise<Role>{
        return this.roleService.updateRole(roleId, role);

    }
}
