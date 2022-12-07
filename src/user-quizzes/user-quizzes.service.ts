import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseService } from 'src/utilities/base.service';
import {
  ISaveAnswers,
  UserQuiz,
  UserQuizDocument
} from './entities/user-quizz.entity';

@Injectable()
export class UserQuizzesService extends BaseService<UserQuizDocument> {
  constructor(
    @InjectModel(UserQuiz.name) private userQuizModel: Model<UserQuizDocument>
  ) {
    super(userQuizModel);
  }

  async findQuizAndUpdateAnswer(saveAnswer: ISaveAnswers) {
    const { quizId, options, questionId } = saveAnswer;
    const findQuiz: any = await this.userQuizModel.findOne({
      quizId: quizId
    });
    const newAnswers = findQuiz?.answers;
    const findIndexMatchedId = findQuiz?.answers?.findIndex(
      (item) => item.questionId === questionId
    );
    findIndexMatchedId === -1 && newAnswers.push({ questionId, options });
    if (findIndexMatchedId !== -1) {
      newAnswers[findIndexMatchedId] = {
        questionId,
        options
      };
    }
    const submmitted = await this.userQuizModel.updateOne(
      {
        quizId: quizId
      },
      { answers: newAnswers }
    );
    return submmitted;
  }
}
