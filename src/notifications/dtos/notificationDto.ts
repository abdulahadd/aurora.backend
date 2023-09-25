import { IsArray, IsBoolean, IsDate, IsNotEmpty, IsObject, IsString } from 'class-validator';
import { PartialType } from "@nestjs/swagger";

export class NotificationDto {
  @IsString()
  @IsNotEmpty()
  readonly message: string;

  @IsDate()
  @IsNotEmpty()
  readonly createdAt: Date;

  @IsArray()
  @IsNotEmpty()
  readonly users: string[];

  @IsObject()
  readonly viewedBy: Record<string, boolean>;
}




export class UpdateNotificationDto extends PartialType(NotificationDto){}