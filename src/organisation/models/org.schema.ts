import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type OrgDocument = Organisation & Document;
@Schema()
export class Organisation{
    @Prop({required: true})
    id: string;

    @Prop({required: true})
    admin: string;

    @Prop({required: true})
    name: string;

    @Prop({required: true})
    noOfEmployees: number;

}

export const OrgSchema = SchemaFactory.createForClass(Organisation);