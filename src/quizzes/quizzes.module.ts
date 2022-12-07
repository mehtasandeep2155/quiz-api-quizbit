import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QuestionsModule } from 'src/questions/questions.module';
import { QuizzesService } from './quizzes.service';
import { QuizzesController } from './quizzes.controller';
import { Quiz, QuizSchema } from './entities/quiz.entity';
import { UserQuizzesModule } from 'src/user-quizzes/user-quizzes.module';
import { UserPerformanceModule } from 'src/user-performance/user-performance.module';

@Module({
  imports: [
    QuestionsModule,
    UserQuizzesModule,
    UserPerformanceModule,
    MongooseModule.forFeature([{ name: Quiz.name, schema: QuizSchema }])
  ],
  controllers: [QuizzesController],
  providers: [QuizzesService],
  exports: [QuizzesService]
})
export class QuizzesModule {}
