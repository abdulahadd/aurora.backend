import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type EventDocument = Event & Document;
@Schema()
export class Event { 
    @Prop({ required: true })
    title : string;

    @Prop({ required: true })
    start: Date;

    @Prop({ required: true })
    end: Date;

    @Prop({required: true})
    orgId: string;

    @Prop()
    users: string[];

}

export const EventSchema = SchemaFactory.createForClass(Event);