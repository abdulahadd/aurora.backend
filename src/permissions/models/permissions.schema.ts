import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";


export type PermissionDocument= Permission & Document;
Schema()
export class Permission{
    @Prop()
    id: string;
    @Prop({ required: true })
    name: string;
    @Prop({ required: true })
    access: boolean; 


}
export const PermissionSchema= SchemaFactory.createForClass(Permission);


    // getUsers: boolean;

    // registerUser: boolean;

    // getOrg: boolean;

    // registerOrg: boolean;

    // getRole: boolean;

    // registerRole: boolean;

    // getPermissions: boolean;