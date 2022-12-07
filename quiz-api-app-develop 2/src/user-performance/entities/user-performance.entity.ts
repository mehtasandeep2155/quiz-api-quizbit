import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { remove_V } from 'src/utilities/functions';

export type PerformanceDocument = Performance & Document;

@Schema({
  toJSON: {
    virtuals: true,
    transform: remove_V
  }
})
export class Performance extends Document {
  @Prop()
  userId: string;

  @Prop()
  email: string;

  @Prop([{ type: Array }])
  performance: [];
}
export const PerformanceSchema = SchemaFactory.createForClass(Performance);
