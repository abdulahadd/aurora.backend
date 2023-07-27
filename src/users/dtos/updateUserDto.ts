import { PartialType } from "@nestjs/swagger";
import { UserDTo } from "./createUserDtos";



export class UpdateUserDto extends PartialType(UserDTo){}