import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type PoliticianDocument = Politician & Document;

@Schema({ timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })
export class Politician {
  @Prop()
  name: string;

  @Prop()
  image: string;

  @Prop()
  party: string;
}

export const politicianSchema = SchemaFactory.createForClass(Politician);
