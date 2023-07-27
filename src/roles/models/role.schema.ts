import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";


export type RoleDocument = Role & Document;
@Schema()
export class Role { 
    @Prop({ required: true })
    id : string;

    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    permissions: [] ;

}

export const RoleSchema = SchemaFactory.createForClass(Role);