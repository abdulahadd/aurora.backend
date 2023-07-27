import { Role } from "../../roles/models/role.schema"; 

export class UserDTo{

    username: string;
    email: string;
    password: string;
    age: number;
    orgId: string;
    role: string;
}

