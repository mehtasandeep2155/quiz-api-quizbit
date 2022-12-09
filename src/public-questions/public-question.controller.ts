import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  UseGuards
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  API_TAG,
  CONTROLLER_DEF,
  OPERATION_TYPE,
  Role
} from 'src/utilities/enums';
import { CreatePublicQuestionDto } from './dto/create-public-question.dto';
import { CreateQuestionDto } from 'src/questions/dto/create-question.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RoleGuard } from 'src/auth/role.guard';
import { ApiDescription } from 'src/decorators/api-description.decorator';
import { QuestionsService } from 'src/questions/questions.service';
import { PublicQuestionService } from './public-question.service';

@Controller(CONTROLLER_DEF.PUBLIC_QUESTIONS)
@ApiTags(API_TAG.PUBLIC_QUESTIONS)
export class PublicQuestionController {
  constructor(
    private readonly questionsService: PublicQuestionService,
    private readonly migrateQuestionsService: QuestionsService
  ) {}

  @Post('/create')
  @ApiDescription(OPERATION_TYPE.NEW_QUESTION)
  async create(@Body() createQuestionDto: CreatePublicQuestionDto) {
    return await this.questionsService.create(createQuestionDto);
  }

  @Get('/list')
  @ApiDescription(OPERATION_TYPE.FIND_ALL_QUESTIONS)
  async findAll() {
    return await this.questionsService.findAll();
  }

  @UseGuards(JwtAuthGuard, new RoleGuard(Role.Admin))
  @ApiBearerAuth()
  @Patch('review-questions/:isReviewed')
  @ApiDescription(OPERATION_TYPE.REVIEW_QUESTIONS)
   async markAsReview(
    @Param('isReviewed') isReviewed: boolean,
    @Body() question_ids: string[]
  ) {
    try {
      const update = await this.questionsService.updateMany(question_ids, {
        isReviewed
      });

      if (update) return 'updated';
    } catch (err) {
      console.log(err);
    }
  }

  @UseGuards(JwtAuthGuard, new RoleGuard(Role.Admin))
  @ApiBearerAuth()
  @Post('migrate-questions')
  @ApiDescription(OPERATION_TYPE.MIGRATE_QUESTIONS)
  async migrateQuestions(@Body() createQuestionDto: CreateQuestionDto[]) {
    try {
      const update = await this.migrateQuestionsService.insertMany(
        createQuestionDto
      );

      if (update) return 'updated';
    } catch (err) {
      console.log(err);
    }
  }
}
