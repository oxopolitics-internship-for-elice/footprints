import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Politician } from './politician.schema';
import { User } from './user.schema';

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

  @Prop({ default: { pro: 0, con: 0 }, type: mongoose.Schema.Types.Mixed })
  regi;

  @Prop({
    default: { pro: 0, neu: 0, con: 0 },
    type: mongoose.Schema.Types.Mixed,
  })
  poll;

  @Prop({ required: true })
  issueDate: Date;

  @Prop()
  pollDate: Date;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  content: string;

  @Prop({ default: true })
  isPollActive: boolean;
}

export const issueSchema = SchemaFactory.createForClass(Issue);
