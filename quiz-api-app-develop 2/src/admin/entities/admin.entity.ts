import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type AdminDocument = Admin & Document;
@Schema()
export class Admin extends Document {
  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  avatar: string;

  @Prop()
  mobileNumber: number;

  @Prop()
  createdAt: Date;
  @Prop()
  updatedAt: Date;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
