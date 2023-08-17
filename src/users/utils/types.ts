import { Exclude } from "class-transformer";
import { UserDTo } from "../dtos/createUserDtos"; 

export class SerializedUser {
    username: string;
    email: string;
    @Exclude()
    password: string;
    age: number;
    orgId: string;
    role: string;
    isRegistered: boolean;

    constructor(partial: Partial<UserDTo>) {
        Object.assign(this, partial);
      }
}