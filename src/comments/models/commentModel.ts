import { IsArray, IsBoolean, IsDate, IsEmail, IsNotEmpty, IsString } from "class-validator";


export class CommentModel { 


    @IsString()
    @IsNotEmpty()
    userId : string;
    
    @IsString()
    @IsNotEmpty()
    eventId: string;

    @IsString()
    @IsNotEmpty()
    comment: string;

}