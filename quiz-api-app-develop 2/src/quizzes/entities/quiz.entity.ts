import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';
import { CreateQuestionDto } from 'src/questions/dto/create-question.dto';
import { remove_V } from 'src/utilities/functions';

export type QuizDocument = Quiz & Document;

export class Time {
  @ApiProperty({ type: Number, required: false })
  hours: number;

  @ApiProperty({ type: Number, required: true })
  minutes: number;

  @ApiProperty({ type: Number, required: true })
  seconds: number;
}


@Schema({
  toJSON: {
    virtuals: true,
    transform:remove_V
  }
})
export class Quiz extends Document {
  @Prop()
  email: string;

  @Prop()
  name: string;

  @Prop()
  questions: CreateQuestionDto[];

  @Prop()
  status: string;

  @Prop()
  quizStack: string[];

  @Prop()
  startedAt: Date;

  @Prop()
  endedAt: Date;

  @Prop()
  score: number;

  @Prop()
  difficultyLevel: string;

  @Prop()
  timeCount: Time;

  @Prop()
  assignedByAdmin: boolean;
}
export const QuizSchema = SchemaFactory.createForClass(Quiz);
