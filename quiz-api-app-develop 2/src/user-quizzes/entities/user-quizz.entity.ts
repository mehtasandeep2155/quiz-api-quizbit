import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { remove_V } from 'src/utilities/functions';
export interface ISaveAnswers {
  quizId: string;
  questionId: string;
  options: Array<string>;
}
export type UserQuizDocument = UserQuiz & Document;

export class questionsWithAnswer {
  @ApiProperty({ type: String })
  quizId: string;

  @ApiProperty({ type: String })
  questionId: string;

  @ApiProperty({ type: Array })
  options: [];
}

@Schema({
  toJSON: {
    virtuals: true,
    transform:remove_V
  }
})
export class UserQuiz extends Document {
  @Prop()
  quizId: string;

  @Prop()
  userId: string;

  @Prop()
  user: string;

  @Prop()
  answers: [];

  @Prop()
  stackWiseDetails:[]
}
export const UserQuizSchema = SchemaFactory.createForClass(UserQuiz);
