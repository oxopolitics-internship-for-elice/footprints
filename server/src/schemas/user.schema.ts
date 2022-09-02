import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type UserDocument = User & mongoose.Document;

@Schema({ _id: false, versionKey: false })
class PollResults {
  @Prop()
  issueId: string;

  @Prop()
  vote: string;

  @Prop()
  agree?: string;
}

const PollResultsSchema = SchemaFactory.createForClass(PollResults);
@Schema({ timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })
export class User {
  // @Prop()
  // _id: mongoose.Schema.Types.ObjectId;

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

  @Prop([{ type: PollResultsSchema }])
  pollResults?: PollResults[];
}

export const userSchema = SchemaFactory.createForClass(User);
