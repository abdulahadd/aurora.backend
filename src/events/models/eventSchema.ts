import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document, mongo } from "mongoose";

export type EventDocument = Event & Document;
@Schema()
export class Event { 
    @Prop({ required: true })
    title : string;

    @Prop({ required: true })
    start: Date;

    @Prop({ required: true })
    end: Date;

}

export const EventSchema = SchemaFactory.createForClass(Event);