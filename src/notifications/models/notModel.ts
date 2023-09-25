import { Prop } from "@nestjs/mongoose";
import { IsArray, IsBoolean, IsDate, IsNotEmpty, IsString } from "class-validator";

export class NotificationModel {
  
    @IsString()
    @IsNotEmpty()
    message: string;
    
    @IsDate()
    @IsNotEmpty()
    createdAt: Date;
  
    @IsBoolean()
    @IsNotEmpty()
    isNew: boolean;

    @IsArray()
    users: string[];

    @IsNotEmpty()
    viewedBy: Record<string, boolean>;
  }