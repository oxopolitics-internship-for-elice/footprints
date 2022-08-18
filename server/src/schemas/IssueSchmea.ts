import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, now } from 'mongoose';

export type IssueDocumet = Issue & Document;

@Schema({ timestamps: true })
export class Issue {
  @Prop({
    required: true,
  })
  targetPolitician: Types.ObjectId;

  @Prop({ default: now() })
  createdAt: Date; // regiDate 이슈 등록날짜 대신 createdAt 사용

  @Prop({
    required: true,
  })
  regiUser: Types.ObjectId;

  @Prop({ required: true })
  regiStatus: string; // 대기중 : inactive 등록됨 : active 만기됨 : expired

  @Prop({ required: true })
  regi: object;

  @Prop({ required: true })
  poll: object;

  @Prop({ required: true })
  issueDate: Date;

  @Prop({ required: true })
  pollDate: Date;

  @Prop({ required: true })
  content: string;

  @Prop({ required: true })
  isPollActive: boolean; // true : 여론 투표 가능 false: 여론 투표 불가능
}

export const issueSchema = SchemaFactory.createForClass(Issue);
