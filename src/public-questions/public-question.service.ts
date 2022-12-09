import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseService } from 'src/utilities/base.service';
import {
  PublicQuestion,
  PublicQuestionDocument
} from './entities/public-questions.entity';

@Injectable()
export class PublicQuestionService extends BaseService<PublicQuestionDocument> {
  constructor(
    @InjectModel(PublicQuestion.name)
    private questionModel: Model<PublicQuestionDocument>
  ) {
    super(questionModel);
  }
}
