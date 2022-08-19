import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User, Politician } from './';
import * as mongoose from 'mongoose';

export type IssueDocument = Issue & mongoose.Document;

@Schema({ timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })
export class Issue {
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Politician',
  })
  targetPolitician: Politician;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  })
  regiUser: User;

  @Prop({ default: 'inactive' })
  regiStatus: string;

  @Prop({ default: { pro: 0, con: 0 } })
  regi: object;

  @Prop({ default: { pro: 0, neu: 0, con: 0 } })
  poll: object;

  @Prop({ required: true })
  issueDate: Date;

  @Prop({ required: true })
  pollDate: Date;

  @Prop({ required: true })
  content: string;

  @Prop({ required: true, default: true })
  isPollActive: boolean;
}

export const issueSchema = SchemaFactory.createForClass(Issue);
