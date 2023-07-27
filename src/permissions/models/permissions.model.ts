import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class PermissionModel { 

    @IsNotEmpty()
    @IsString()
    id : string;

    @IsNotEmpty()
    @IsString()
    name: string;


    @IsNotEmpty()
    @IsBoolean()
    access: boolean;

}