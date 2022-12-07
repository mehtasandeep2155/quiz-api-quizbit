import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type AuthDocument = Auth & Document;
@Schema()
export class Auth extends Document {
  @Prop()
  email: string;

  @Prop()
  password: string;

}
export const AuthSchema = SchemaFactory.createForClass(Auth);
