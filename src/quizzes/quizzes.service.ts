import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseService } from 'src/utilities/base.service';
import { QUIZ_TYPE } from 'src/utilities/enums';
import {
  lookupUsersInQuiz,
  unsetQuizDetails,
  unwindUserDetail
} from 'src/utilities/mongo-query';
import { Quiz, QuizDocument } from './entities/quiz.entity';

@Injectable()
export class QuizzesService extends BaseService<QuizDocument> {
  constructor(@InjectModel(Quiz.name) private quizModel: Model<QuizDocument>) {
    super(quizModel);
  }
  currDate = new Date();
  firstDayOfWeek = new Date(
    this.currDate.setDate(this.currDate.getDate() - this.currDate.getDay())
  );

  async getStats() {
    const getGroupStats = await this.quizModel.aggregate([
      {
        $group: {
          _id: '$status',
          totalNo: { $sum: 1 }
        }
      }
    ]);
    return getGroupStats;
  }

  async getTopScorerofThisweek() {
    const topScorerList = await this.quizModel.aggregate([
      {
        $match: {
          $and: [
            {
              endedAt: {
                $gte: this.firstDayOfWeek,
                $lte: new Date()
              }
            },
            { status: QUIZ_TYPE.COMPLETED }
          ]
        }
      },
      lookupUsersInQuiz,
      unwindUserDetail,
      unsetQuizDetails,
      {
        $sort: {
          score: -1
        }
      },
      {
        $limit: 5
      }
    ]);
    return topScorerList;
  }

  async leaderBoard() {
    const leaderBoardJson = await this.quizModel.aggregate([
      {
        $match: {
          status: QUIZ_TYPE.COMPLETED
        }
      },
      lookupUsersInQuiz,
      unwindUserDetail,
      unsetQuizDetails,
      {
        $sort: {
          score: -1
        }
      }
    ]);
    return leaderBoardJson;
  }
  async findQuizByUserEmail(email: string, status: string) {
    return await this.quizModel.find({ email: email, status: status }).exec();
  }

  async updateQuizTime(id: string, timeCount: any) {
    return await this.quizModel.findByIdAndUpdate(id, {
      timeCount
    });
  }
}
