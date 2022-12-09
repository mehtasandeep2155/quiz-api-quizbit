import { Module } from '@nestjs/common';
import { PublicQuestionService } from './public-question.service';
import { PublicQuestionController } from './public-question.controller';
import { MongooseModule } from "@nestjs/mongoose";
import { PublicQuestion, PublicQuestionSchema } from "./entities/public-questions.entity";
import { QuestionsModule } from 'src/questions/questions.module';

@Module({
  imports: [
    QuestionsModule,
    MongooseModule.forFeature([
      { name: PublicQuestion.name, schema: PublicQuestionSchema },
    ]),
  ],
  controllers: [PublicQuestionController],
  providers: [PublicQuestionService],
  exports: [PublicQuestionService],
})
export class PublicQuestionModule {}
