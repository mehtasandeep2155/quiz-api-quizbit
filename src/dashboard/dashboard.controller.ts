import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RoleGuard } from 'src/auth/role.guard';
import { QuizzesService } from 'src/quizzes/quizzes.service';
import { API_TAG, CONTROLLER_DEF, Role } from 'src/utilities/enums';

@Controller(CONTROLLER_DEF.ADMIN_DASHBOARD)
@ApiTags(API_TAG.ADMIN_DASHBOARD)
export class DashboardController {
  constructor(private readonly quizzesService: QuizzesService) {}

  @UseGuards(JwtAuthGuard, new RoleGuard(Role.Admin))
  @ApiBearerAuth()
  @Get('/quiz-stats')
  async getMyQuiz() {
    const getQuizStats = (await this.quizzesService.getStats()).flat();
    return getQuizStats;
  }

  @UseGuards(JwtAuthGuard, new RoleGuard(Role.Admin))
  @ApiBearerAuth()
  @Get('/top-scorer')
  async getTopScorer() {
    const topScorer = await this.quizzesService.getTopScorerofThisweek();
    return topScorer;
  }

  @UseGuards(JwtAuthGuard, new RoleGuard(Role.Admin))
  @ApiBearerAuth()
  @Get('/leader-board')
  async leaderBoard() {
    const leaderJsonData = await this.quizzesService.leaderBoard();
    return leaderJsonData;
  }

  @UseGuards(JwtAuthGuard, new RoleGuard(Role.Admin))
  @ApiBearerAuth()
  @Get('/all-quiz-list')
  async allQuizlist() {
    const allQuizlistJsonData = await this.quizzesService.findAll();
    return allQuizlistJsonData;
  }
}
