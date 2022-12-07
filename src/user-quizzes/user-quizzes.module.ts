import { Module } from '@nestjs/common';
import { UserQuizzesService } from './user-quizzes.service';
import { UserQuizzesController } from './user-quizzes.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserQuiz, UserQuizSchema } from './entities/user-quizz.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: UserQuiz.name, schema: UserQuizSchema }])
  ],
  controllers: [UserQuizzesController],
  providers: [UserQuizzesService],
  exports:[UserQuizzesService]
})
export class UserQuizzesModule {}
