import { PartialType } from "@nestjs/swagger";
import { PermissionModel } from "../models/permissions.model";



export class UpdatePermissionDto extends PartialType(PermissionModel){}