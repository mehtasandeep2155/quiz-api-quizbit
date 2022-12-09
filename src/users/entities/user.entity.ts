import { Document, now } from 'mongoose';
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
  githubLink: string;

  @Prop()
  linkedInLink: string;

  @Prop()
  bio: string;

  @Prop()
  instagramLink: string;

  @Prop()
  facebookLink: string;

  @Prop()
  twitterLink: string;

  @Prop()
  favoriteTechStack: string[];

  @Prop()
  isBlocked: boolean;

  @Prop()
  avatar: string;

  @Prop()
  mobileNumber: number;

  @Prop({default:now()})
  createdAt: Date;
  
  @Prop()
  updatedAt: Date;
  
  @Prop()
  refreshToken: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
