import { IsArray, IsBoolean, IsDate, IsEmail, IsNotEmpty, IsString, isBoolean, isNotEmpty } from "class-validator";


export class CommentModel { 


    @IsString()
    @IsNotEmpty()
    userId : string;
    
    @IsString()
    @IsNotEmpty()
    eventId: string;

    @IsNotEmpty()
    @IsBoolean()
    isActive: boolean;
    

    @IsString()
    @IsNotEmpty()
    comment: string;

}