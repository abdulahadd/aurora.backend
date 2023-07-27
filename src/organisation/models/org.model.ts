import { IsNotEmpty, IsNumber, IsString } from "class-validator";



export class OrgModel{

    @IsNotEmpty()
    @IsString()
    id: string;

    @IsNotEmpty()
    @IsString()
    admin: string;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsNumber()
    noOfEmployees: number;

}
