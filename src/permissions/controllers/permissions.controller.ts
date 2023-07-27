import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { Permission } from '../models/permissions.schema';
import { PermissionsService } from '../services/permissions.service';
import { PermissionModel } from '../models/permissions.model';
import { UpdatePermissionDto } from '../dtos/updatePermissionDto';

@Controller('permissions')
export class PermissionsController {
    constructor(private readonly permissionService: PermissionsService){}

    @Get('')
    async getRoles(): Promise<Permission[]>{
        return this.permissionService.getPermissions();

    }

    @Get(':id')
    getOne(@Param('id') id: string ): Promise<Permission>{
        return this.permissionService.getPermissionsById(id);
    }

    @Post('')
    createRole(@Body() permission: PermissionModel){
        return this.permissionService.createPermission(permission);

    }

    @Patch(':id')
    updateRole(@Param('id') id: string, @Body() per: UpdatePermissionDto): Promise<Permission>{
        return this.permissionService.updatePermission(id, per);

    }

}
