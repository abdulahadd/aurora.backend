import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document, mongo } from "mongoose";

export type EventDocument = Event & Document;
@Schema()
export class Event { 
    @Prop({ required: true })
    title : string;

    @Prop({ required: true })
    startDate: Date;

    @Prop({ required: true })
    startTime: string;

    
}

export const EventSchema = SchemaFactory.createForClass(Event);