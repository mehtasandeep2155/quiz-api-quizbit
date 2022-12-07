import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type AuthDocument = AdminAuth & Document;
@Schema()
export class AdminAuth extends Document {
  @Prop()
  email: string;

  @Prop()
  password: string;

}
export const AuthSchema = SchemaFactory.createForClass(AdminAuth);
