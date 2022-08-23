import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type PoliticianDocument = Politician & Document;

@Schema({ timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })
export class Politician {
  @Prop()
  name: string;

  @Prop()
  image: string;

  @Prop()
  party: string;

  @Prop()
  issues: [mongoose.Schema.Types.ObjectId];
}

export const politicianSchema = SchemaFactory.createForClass(Politician);
