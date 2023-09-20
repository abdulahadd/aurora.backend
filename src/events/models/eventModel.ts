import { IsArray, IsBoolean, IsDate, IsEmail, IsNotEmpty, IsString } from "class-validator";


export class EventModel { 


    @IsString()
    @IsNotEmpty()
    title : string;

    @IsString()
    @IsNotEmpty()
    @IsDate()
    start: Date;

    @IsDate()
    @IsString()
    @IsNotEmpty()
    end: Date;
    
    @IsString()
    @IsNotEmpty()
    orgId: string;

    @IsArray()
    users: string[];
 

}