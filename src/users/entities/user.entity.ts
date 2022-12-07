import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { removePasword, remove_V } from 'src/utilities/functions';

export type UserDocument = User & Document;
@Schema({
  toJSON: {
    virtuals: true,
    transform:removePasword
  }
})
export class User extends Document {
  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  isBlocked: boolean;

  @Prop()
  avatar: string;

  @Prop()
  mobileNumber: number;

  @Prop()
  createdAt: Date;
  @Prop()
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User)