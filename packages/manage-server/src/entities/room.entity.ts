import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RoomDocument = Room & Document;

@Schema()
export class Room extends Document {
  @Prop({ required: true, unique: true, message: '房间名字必需唯一' })
  name: string;
  @Prop({ required: true, unique: true, message: '房间号必需唯一' })
  code: string;
  @Prop()
  signalGatewayId: string;
  @Prop({ default: Date.now() })
  updateAt: Date;
  @Prop({ default: Date.now() })
  createAt: Date;
}

export const RoomSchema = SchemaFactory.createForClass(Room);
