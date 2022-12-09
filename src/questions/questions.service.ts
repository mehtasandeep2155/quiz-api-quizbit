import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseService } from 'src/utilities/base.service';
import { Question, QuestionDocument } from './entities/question.entity';

@Injectable()
export class QuestionsService extends BaseService<QuestionDocument> {
  constructor(
    @InjectModel(Question.name)
    private questionModel: Model<QuestionDocument>
  ) {
    super(questionModel);
  }

  async findByCategory(
    category: string,
    difficultyLevel: string
  ): Promise<Question[]> {
    return await this.questionModel.find({ category, difficultyLevel });
  }
}
