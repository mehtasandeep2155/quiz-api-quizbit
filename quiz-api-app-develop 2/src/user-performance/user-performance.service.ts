import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseService } from 'src/utilities/base.service';
import { CreateUserPerformanceDto } from './dto/create-user-performance.dto';
import {
  Performance,
  PerformanceDocument
} from './entities/user-performance.entity';

@Injectable()
export class UserPerformanceService extends BaseService<PerformanceDocument> {
  constructor(
    @InjectModel(Performance.name)
    private userPerformanceModel: Model<PerformanceDocument>
  ) {
    super(userPerformanceModel);
  }
  async createPerformance(createUserPerformanceDto: CreateUserPerformanceDto) {
    const record = new this.userPerformanceModel(createUserPerformanceDto);
    await record.save();
    return record;
  }
}
