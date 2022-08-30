import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })
export class User {
  @Prop()
  userName: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop({ default: ' basic' })
  role?: string;

  @Prop({ default: 'normal' })
  userStatus?: string;

  @Prop({ default: '' })
  refreshToken?: string;

  @Prop({ default: '' })
  tribe?: string;

}

export const userSchema = SchemaFactory.createForClass(User);
