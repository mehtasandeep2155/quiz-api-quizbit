import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  HttpException,
  HttpStatus,
  Delete,
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
import { QuestionsService } from 'src/questions/questions.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RoleGuard } from 'src/auth/role.guard';
import {
  EMAIL_SUBJECT,
  OPERATION_TYPE,
  QUIZ_TYPE,
  RESPONSE_MESSAGE,
  Role
} from 'src/utilities/enums';
import { QuizzesService } from './quizzes.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { UserQuizzesService } from 'src/user-quizzes/user-quizzes.service';
import { Time } from './entities/quiz.entity';
import { checkCorrectAnswer, makeQuestions } from 'src/utilities/functions';
import { UserPerformanceService } from 'src/user-performance/user-performance.service';
import { shuffle } from 'src/utilities/shuffleArray';
import { MailerService } from '@nestjs-modules/mailer';
import { quizEmailTemplates } from 'src/utilities/email-templates';

@Controller('quizzes')
@ApiTags('Quiz CRUD')
export class QuizzesController {
  constructor(
    private readonly quizzesService: QuizzesService,
    private readonly questionsService: QuestionsService,
    private readonly userQuizzesService: UserQuizzesService,
    private readonly userPerformanceService: UserPerformanceService,
    private readonly mailerService: MailerService
  ) { }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post('/new-quiz')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ description: OPERATION_TYPE.NEW_QUIZ })
  @ApiOkResponse({ description: RESPONSE_MESSAGE.SUCCESS })
  @ApiNotFoundResponse({ description: RESPONSE_MESSAGE.NOT_FOUND })
  @ApiUnauthorizedResponse({ description: RESPONSE_MESSAGE.UNAUTHORIZED_USER })
  @ApiInternalServerErrorResponse({
    description: RESPONSE_MESSAGE.SERVER_ERROR
  })
  async create(@Body() createQuizDto: CreateQuizDto) {
    try {
      const questionByCategoryAndLevel = createQuizDto.quizStack.map(
        async (stack) =>
          await this.questionsService.findByCategory(
            stack,
            createQuizDto.difficultyLevel
          )
      );
      const allQuizQuestions = await Promise.all(questionByCategoryAndLevel);
      const quizQuestions = allQuizQuestions.flat();
      const shuffledQuestions = await shuffle(quizQuestions);
      const finalQuizQuestion = makeQuestions(
        shuffledQuestions,
        createQuizDto?.difficultyLevel
      );
      const body = Object.assign(createQuizDto, {
        questions: finalQuizQuestion,
        score: 0,
        status: QUIZ_TYPE.PENDING,
        startedAt: new Date(),
        endedAt: null
      });
      const newQuiz = await this.quizzesService.create(body);
      if (body.assignedByAdmin) {
        this.mailerService.sendMail({
          to: `${body.email}`, 
          subject: EMAIL_SUBJECT.QUIZ,
          html: quizEmailTemplates(newQuiz._id),
        });
      }
      const createUserQuizAnswers = {
        quizId: newQuiz._id,
        user: newQuiz.email,
        answers: [],
        stackWiseDetails: []
      };
      const newAnswersQuiz = await this.userQuizzesService.create(
        createUserQuizAnswers
      );
      return newAnswersQuiz;
    } catch (error) {
      throw new HttpException(
        {
          response: {
            err: 'Something went wrong'
          }
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @UseGuards(JwtAuthGuard, new RoleGuard(Role.Admin))
  @ApiBearerAuth()
  @Get('/quiz-list')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ description: OPERATION_TYPE.ALL_QUIZ })
  @ApiOkResponse({ description: RESPONSE_MESSAGE.SUCCESS })
  @ApiNotFoundResponse({ description: RESPONSE_MESSAGE.NOT_FOUND })
  @ApiUnauthorizedResponse({ description: RESPONSE_MESSAGE.UNAUTHORIZED_USER })
  @ApiInternalServerErrorResponse({
    description: RESPONSE_MESSAGE.SERVER_ERROR
  })
  findAll() {
    return this.quizzesService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ description: OPERATION_TYPE.QUIZ_BY_ID })
  @ApiOkResponse({ description: RESPONSE_MESSAGE.SUCCESS })
  @ApiNotFoundResponse({ description: RESPONSE_MESSAGE.NOT_FOUND })
  @ApiUnauthorizedResponse({ description: RESPONSE_MESSAGE.UNAUTHORIZED_USER })
  @ApiInternalServerErrorResponse({
    description: RESPONSE_MESSAGE.SERVER_ERROR
  })
  findOne(@Param('id') id: string) {
    return this.quizzesService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Patch('/update/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ description: OPERATION_TYPE.UPDATE_QUIZ })
  @ApiOkResponse({ description: RESPONSE_MESSAGE.SUCCESS })
  @ApiNotFoundResponse({ description: RESPONSE_MESSAGE.NOT_FOUND })
  @ApiUnauthorizedResponse({ description: RESPONSE_MESSAGE.UNAUTHORIZED_USER })
  @ApiInternalServerErrorResponse({
    description: RESPONSE_MESSAGE.SERVER_ERROR
  })
  async update(@Param('id') id: string, @Body() updateQuizDto: UpdateQuizDto) {
    let overAllScore = 0;
    const findQuiz = await this.quizzesService.findOne(id);
    const findAnsweredQuiz = await this.userQuizzesService.findByField({
      quizId: id
    });
    const quizQuestionWithAnswers = findQuiz?.questions?.map((ques: any) => ({
      _id: ques._id,
      correctAnswers: ques.correctAnswers,
      category: ques.category
    }));
    const submittedAnswers = findAnsweredQuiz?.answers;
    const newStack = {};
    quizQuestionWithAnswers.forEach((ques) => {
      if (!newStack[ques.category])
        newStack[ques.category] = {
          tech: ques.category,
          score: 0,
          totalQuestions: 0
        };

      const temp: any = submittedAnswers.find(
        (answer: any) => ques?._id?.toString() === answer?.questionId
      );
      newStack[ques.category].totalQuestions =
        newStack[ques.category].totalQuestions + 1;
      if (temp && checkCorrectAnswer(ques?.correctAnswers, temp?.options)) {
        overAllScore = overAllScore + 1;
        newStack[ques.category].score = newStack[ques.category].score + 1;
      }
    });

    const currentQuizScoreWithStack = Object.values(newStack);
    await this.userQuizzesService.update(findAnsweredQuiz?._id, {
      stackWiseDetails: currentQuizScoreWithStack
    });
    Object.assign(updateQuizDto, {
      score: overAllScore
    });
    const userPerformance = await this.userPerformanceService.findByField({
      email: findQuiz?.email
    });
    if (userPerformance?.performance?.length === 0) {
      await this.userPerformanceService.update(
        userPerformance?._id.toString(),
        {
          performance: currentQuizScoreWithStack
        }
      );
    }

    if (userPerformance?.performance?.length > 0) {
      const userEfforts = [
        ...userPerformance.performance,
        ...currentQuizScoreWithStack
      ];
      const overAllUsersEfforts: any = [];
      userEfforts.forEach(function (a: any) {
        if (!this[a.tech]) {
          this[a.tech] = { tech: a.tech, score: 0, totalQuestions: 0 };
          overAllUsersEfforts.push(this[a.tech]);
        }
        this[a.tech].score += a.score;
        this[a.tech].totalQuestions += a.totalQuestions;
      }, Object.create(null));
      await this.userPerformanceService.update(
        userPerformance?._id.toString(),
        {
          performance: overAllUsersEfforts
        }
      );
    }

    return await this.quizzesService.update(id, updateQuizDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Patch('/update/time/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ description: OPERATION_TYPE.UPDATE_QUIZ })
  @ApiOkResponse({ description: RESPONSE_MESSAGE.SUCCESS })
  @ApiNotFoundResponse({ description: RESPONSE_MESSAGE.NOT_FOUND })
  @ApiUnauthorizedResponse({ description: RESPONSE_MESSAGE.UNAUTHORIZED_USER })
  @ApiInternalServerErrorResponse({
    description: RESPONSE_MESSAGE.SERVER_ERROR
  })
  async updateTime(@Param('id') id: string, @Body() time: Time) {
    return await this.quizzesService.updateQuizTime(id, time);
  }

  @UseGuards(JwtAuthGuard, new RoleGuard(Role.Admin))
  @ApiBearerAuth()
  @Delete('/delete/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ description: OPERATION_TYPE.DELETE_QUIZ })
  @ApiOkResponse({ description: RESPONSE_MESSAGE.SUCCESS })
  @ApiNotFoundResponse({ description: RESPONSE_MESSAGE.NOT_FOUND })
  @ApiUnauthorizedResponse({ description: RESPONSE_MESSAGE.UNAUTHORIZED_USER })
  @ApiInternalServerErrorResponse({
    description: RESPONSE_MESSAGE.SERVER_ERROR
  })
  async remove(@Param('id') id: string) {
    try {
      return this.quizzesService.remove(id);
    } catch (error) {
      return Error;
    }
  }
}
