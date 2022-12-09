import { Module } from '@nestjs/common';
import { QuizzesModule } from 'src/quizzes/quizzes.module';
import { DashboardController } from './dashboard.controller';

@Module({
  imports: [QuizzesModule],
  controllers: [DashboardController],
})
export class DashboardModule {}
