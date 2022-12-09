import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { remove_V } from 'src/utilities/functions';

export class Option {
  @ApiProperty({ type: String, required: true })
  @IsNotEmpty()
  option: string;

  @ApiProperty({ type: Boolean, required: true })
  isTrue: boolean;

  @ApiProperty({ type: String, required: true })
  label: string;
}

export type PublicQuestionDocument = PublicQuestion & Document;
@Schema({
  toJSON: {
    virtuals: true,
    transform: remove_V
  }
})
export class PublicQuestion extends Document {
  @Prop()
  name: string;

  @Prop()
  question: string;

  @Prop()
  category: string;

  @Prop()
  questionType:string
  
  @Prop()
  difficultyLevel: string;

  @Prop([{ type: Array }])
  options: Option[];

  @Prop([{ type: Array }])
  correctAnswers: string[];

  @Prop()
  isReviewed: boolean;
}
export const PublicQuestionSchema = SchemaFactory.createForClass(PublicQuestion);
