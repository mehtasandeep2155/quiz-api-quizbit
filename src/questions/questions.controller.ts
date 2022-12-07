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
import {
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse
} from '@nestjs/swagger';
import { OPERATION_TYPE, RESPONSE_MESSAGE, Role } from 'src/utilities/enums';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RoleGuard } from 'src/auth/role.guard';
import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';

@Controller('questions')
@ApiTags('Questions CRUD')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @UseGuards(JwtAuthGuard, new RoleGuard(Role.Admin))
  @ApiBearerAuth()
  @Post('/create')
  @UseGuards()
  @ApiBearerAuth('JWT-auth')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ description: OPERATION_TYPE.NEW_QUESTION })
  @ApiOkResponse({ description: RESPONSE_MESSAGE.SUCCESS })
  @ApiNotFoundResponse({ description: RESPONSE_MESSAGE.NOT_FOUND })
  @ApiUnauthorizedResponse({ description: RESPONSE_MESSAGE.UNAUTHORIZED_USER })
  @ApiInternalServerErrorResponse({
    description: RESPONSE_MESSAGE.SERVER_ERROR
  })
  async create(@Body() createQuestionDto: CreateQuestionDto) {
    return await this.questionsService.create(createQuestionDto);
  }

  @UseGuards(JwtAuthGuard, new RoleGuard(Role.Admin))
  @ApiBearerAuth()
  @Get('/question-list')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ description: OPERATION_TYPE.ALL_QUESTIONS })
  @ApiOkResponse({ description: RESPONSE_MESSAGE.SUCCESS })
  @ApiNotFoundResponse({ description: RESPONSE_MESSAGE.NOT_FOUND })
  @ApiUnauthorizedResponse({ description: RESPONSE_MESSAGE.UNAUTHORIZED_USER })
  @ApiInternalServerErrorResponse({
    description: RESPONSE_MESSAGE.SERVER_ERROR
  })
  async findAll() {
    return await this.questionsService.findAll();
  }

  @UseGuards(JwtAuthGuard, new RoleGuard(Role.Admin))
  @ApiBearerAuth()
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ description: OPERATION_TYPE.QUESTION_BY_ID })
  @ApiOkResponse({ description: RESPONSE_MESSAGE.SUCCESS })
  @ApiNotFoundResponse({ description: RESPONSE_MESSAGE.NOT_FOUND })
  @ApiUnauthorizedResponse({ description: RESPONSE_MESSAGE.UNAUTHORIZED_USER })
  @ApiInternalServerErrorResponse({
    description: RESPONSE_MESSAGE.SERVER_ERROR
  })
  async findOne(@Param('id') id: string) {
    return await this.questionsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, new RoleGuard(Role.Admin))
  @ApiBearerAuth()
  @Patch('update/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ description: OPERATION_TYPE.UPDATE_QUESTION })
  @ApiOkResponse({ description: RESPONSE_MESSAGE.SUCCESS })
  @ApiNotFoundResponse({ description: RESPONSE_MESSAGE.NOT_FOUND })
  @ApiUnauthorizedResponse({ description: RESPONSE_MESSAGE.UNAUTHORIZED_USER })
  @ApiInternalServerErrorResponse({
    description: RESPONSE_MESSAGE.SERVER_ERROR
  })
  async update(
    @Param('id') id: string,
    @Body() updateQuestionDto: UpdateQuestionDto
  ) {
    return await this.questionsService.update(id, updateQuestionDto);
  }
  
  @UseGuards(JwtAuthGuard, new RoleGuard(Role.Admin))
  @ApiBearerAuth()
  @Delete('delete/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ description: OPERATION_TYPE.DELETE_QUESTION })
  @ApiOkResponse({ description: RESPONSE_MESSAGE.SUCCESS })
  @ApiNotFoundResponse({ description: RESPONSE_MESSAGE.NOT_FOUND })
  @ApiUnauthorizedResponse({ description: RESPONSE_MESSAGE.UNAUTHORIZED_USER })
  @ApiInternalServerErrorResponse({
    description: RESPONSE_MESSAGE.SERVER_ERROR
  })
  async remove(@Param('id') id: string) {
    try {
      return await this.questionsService.remove(id);
    } catch (error) {
      return Error;
    }
  }
}
