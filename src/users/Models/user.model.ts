import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";
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

    @IsNumber()
    @IsNotEmpty()
    age: number;


    orgId: string;

    @IsString()
    @IsNotEmpty()
    role: string;
 

}