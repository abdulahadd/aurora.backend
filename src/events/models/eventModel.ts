import { IsBoolean, IsEmail, IsNotEmpty, IsString } from "class-validator";


export class EventModel { 


    @IsString()
    @IsNotEmpty()
    title : string;

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    start: Date;

    @IsString()
    @IsNotEmpty()
    end: Date;
 

}