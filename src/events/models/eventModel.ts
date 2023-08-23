import { IsBoolean, IsDate, IsEmail, IsNotEmpty, IsString } from "class-validator";


export class EventModel { 


    @IsString()
    @IsNotEmpty()
    title : string;

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    @IsDate()
    start: Date;

    @IsDate()
    @IsString()
    @IsNotEmpty()
    end: Date;
 

}