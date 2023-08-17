import { IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsNumberString, IsString } from "class-validator";
import { Role } from "../../roles/models/role.schema";

export class UserModel { 


    @IsString()
    @IsNotEmpty()
    username : string;

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsNumberString()
    @IsNotEmpty()
    age: number;


    orgId: string;

    @IsString()
    @IsNotEmpty()
    role: string;

    @IsBoolean()
    isRegistered: boolean;

 

}