import { Exclude } from "class-transformer";
import { UserDTo } from "../dtos/createUserDtos"; 
import { Role } from "../../roles/models/role.schema"; 

export class SerializedUser {
    username: string;
    email: string;
    @Exclude()
    password: string;
    age: number;
    orgId: string;
    role: string;

    constructor(partial: Partial<UserDTo>) {
        Object.assign(this, partial);
      }
}