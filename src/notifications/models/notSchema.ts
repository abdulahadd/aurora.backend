import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type NotificationDocument = Notification & Document;

@Schema()
export class Notification extends Document {
  @Prop({ required: true })
  message: string;

  @Prop({ required: true, type: Date })
  createdAt: Date;

  @Prop({ required: true })
  isNew: boolean;

  @Prop({ type: [String], required: true })
  users: string[];

  @Prop({ type: Map, of: Boolean, required: true, default: {} })
  viewedBy: Record<string, boolean>;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);