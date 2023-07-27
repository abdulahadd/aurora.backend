import { IsArray, IsNotEmpty, IsString } from "class-validator";


export class RoleModel { 


    @IsNotEmpty()
    @IsString()
    id : string;

    @IsNotEmpty()
    @IsString()
    name: string;


    @IsNotEmpty()
    @IsArray()
    permissions: [];

}