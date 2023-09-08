import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document, mongo } from "mongoose";

export type CommentDocument = Comment & Document;
@Schema()
export class Comment { 
    @Prop({ required: true })
    userId : string;

    @Prop({ required: true })
    eventId: string;

    @Prop({ required: true })
    isActive: boolean;

    @Prop({ required: true })
    comment: string;

}

export const CommentSchema = SchemaFactory.createForClass(Comment);