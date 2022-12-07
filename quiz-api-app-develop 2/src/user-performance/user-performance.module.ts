import { Module } from '@nestjs/common';
import { UserPerformanceService } from './user-performance.service';
import { UserPerformanceController } from './user-performance.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Performance,
  PerformanceSchema
} from './entities/user-performance.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Performance.name, schema: PerformanceSchema }
    ])
  ],
  controllers: [UserPerformanceController],
  providers: [UserPerformanceService],
  exports: [UserPerformanceService]
})
export class UserPerformanceModule {}
