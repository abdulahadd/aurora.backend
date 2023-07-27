import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class signInDTo{
    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty()
    password: string;

}
