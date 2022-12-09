import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  HttpCode,
  UseGuards
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { OPERATION_TYPE, Role } from 'src/utilities/enums';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RoleGuard } from 'src/auth/role.guard';
import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { ApiDescription } from 'src/decorators/api-description.decorator';

@Controller('questions')
@ApiTags('Questions CRUD')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @UseGuards(JwtAuthGuard, new RoleGuard(Role.Admin))
  @Post('/create')
  @UseGuards()
  @ApiBearerAuth('JWT-auth')
  @HttpCode(HttpStatus.OK)
  @ApiDescription(OPERATION_TYPE.NEW_QUESTION)
  async create(@Body() createQuestionDto: CreateQuestionDto) {
    return await this.questionsService.create(createQuestionDto);
  }

  @UseGuards(JwtAuthGuard, new RoleGuard(Role.Admin))
  @Get('/question-list')
  @HttpCode(HttpStatus.OK)
  @ApiDescription(OPERATION_TYPE.ALL_QUESTIONS)
  async findAll() {
    return await this.questionsService.findAll();
  }

  @UseGuards(JwtAuthGuard, new RoleGuard(Role.Admin))
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiDescription(OPERATION_TYPE.QUESTION_BY_ID)
  async findOne(@Param('id') id: string) {
    return await this.questionsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, new RoleGuard(Role.Admin))
  @Patch('update/:id')
  @HttpCode(HttpStatus.OK)
  @ApiDescription(OPERATION_TYPE.UPDATE_QUESTION)
  async update(
    @Param('id') id: string,
    @Body() updateQuestionDto: UpdateQuestionDto
  ) {
    return await this.questionsService.update(id, updateQuestionDto);
  }

  @UseGuards(JwtAuthGuard, new RoleGuard(Role.Admin))
  @Delete('delete/:id')
  @HttpCode(HttpStatus.OK)
  @ApiDescription(OPERATION_TYPE.DELETE_QUESTION)
  async remove(@Param('id') id: string) {
    try {
      return await this.questionsService.remove(id);
    } catch (error) {
      return Error;
    }
  }
}
