import { PartialType } from "@nestjs/swagger";
import { RoleModel } from "../models/role.model";



export class UpdateRoleDto extends PartialType(RoleModel){}