import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document, mongo } from "mongoose";

export type UserDocument = User & Document;
@Schema()
export class User { 

    @Prop({ required: true })
    username : string;

    @Prop({ required: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({ required: true })
    age: number;

    @Prop()
    orgId: string;
    
    @Prop()
    role: string;

    @Prop()
    isRegistered: boolean;

    

}

export const UserSchema = SchemaFactory.createForClass(User);