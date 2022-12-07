import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  UseGuards
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RESPONSE_MESSAGE } from 'src/utilities/enums';
import { questionsWithAnswer } from './entities/user-quizz.entity';
import { UserQuizzesService } from './user-quizzes.service';

@Controller('user-quizzes')
export class UserQuizzesController {
  constructor(private readonly userQuizzesService: UserQuizzesService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Patch('/save-answer')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ description: '' })
  @ApiOkResponse({ description: '' })
  @ApiNotFoundResponse({ description: '' })
  @ApiUnauthorizedResponse({ description: '' })
  @ApiInternalServerErrorResponse({
    description: ''
  })
  async saveAnswer(@Body() saveAnswer: questionsWithAnswer) {
    return await this.userQuizzesService.findQuizAndUpdateAnswer(saveAnswer);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('/get-save-answers/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: RESPONSE_MESSAGE.SUCCESS })
  @ApiNotFoundResponse({ description: RESPONSE_MESSAGE.NOT_FOUND })
  @ApiUnauthorizedResponse({ description: RESPONSE_MESSAGE.UNAUTHORIZED_USER })
  @ApiInternalServerErrorResponse({
    description: RESPONSE_MESSAGE.SERVER_ERROR
  })
  async getSavedAnswers(@Param('id') id: string) {
    return await this.userQuizzesService.findByField({
      quizId: id
    });
  }
}
