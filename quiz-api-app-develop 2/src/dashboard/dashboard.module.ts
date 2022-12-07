import { Module } from '@nestjs/common';
import { QuizzesModule } from 'src/quizzes/quizzes.module';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';

@Module({
  imports: [QuizzesModule],
  controllers: [DashboardController],
  providers: [DashboardService]
})
export class DashboardModule {}
