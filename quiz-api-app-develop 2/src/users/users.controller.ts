import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  UseGuards,
  Response
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
import {
  AUTH,
  OPERATION_TYPE,
  QUIZ_TYPE,
  RESPONSE_MESSAGE,
  Role
} from 'src/utilities/enums';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RoleGuard } from 'src/auth/role.guard';
import { QuizzesService } from 'src/quizzes/quizzes.service';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { hashPassword } from 'src/utilities/functions';

@Controller('users')
@ApiTags('Users CRUD')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly quizzesService: QuizzesService
  ) {}

  @Post('/register')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ description: OPERATION_TYPE.NEW_USER })
  @ApiOkResponse({ description: RESPONSE_MESSAGE.SUCCESS })
  @ApiNotFoundResponse({ description: RESPONSE_MESSAGE.NOT_FOUND })
  @ApiUnauthorizedResponse({ description: RESPONSE_MESSAGE.UNAUTHORIZED_USER })
  @ApiInternalServerErrorResponse({
    description: RESPONSE_MESSAGE.SERVER_ERROR
  })
  async create(@Body() createUserDto: CreateUserDto, @Response() res) {
    const { token } = await this.usersService.create(createUserDto);
    return res.header(AUTH.AUTHORIZATION, token).send({
      success: true,
      token
    });
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('/pending-quiz/:email')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ description: OPERATION_TYPE.GET_USER_PENDING_QUIZ })
  @ApiOkResponse({ description: RESPONSE_MESSAGE.SUCCESS })
  @ApiNotFoundResponse({ description: RESPONSE_MESSAGE.NOT_FOUND })
  @ApiUnauthorizedResponse({ description: RESPONSE_MESSAGE.UNAUTHORIZED_USER })
  @ApiInternalServerErrorResponse({
    description: RESPONSE_MESSAGE.SERVER_ERROR
  })
  async findUserPendingQuiz(@Param('email') email: string) {
    return await this.quizzesService.findQuizByUserEmail(
      email,
      QUIZ_TYPE.PENDING
    );
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('/completed-quiz/:email')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ description: OPERATION_TYPE.GET_USER_COMPLETED_QUIZ })
  @ApiOkResponse({ description: RESPONSE_MESSAGE.SUCCESS })
  @ApiNotFoundResponse({ description: RESPONSE_MESSAGE.NOT_FOUND })
  @ApiUnauthorizedResponse({ description: RESPONSE_MESSAGE.UNAUTHORIZED_USER })
  @ApiInternalServerErrorResponse({
    description: RESPONSE_MESSAGE.SERVER_ERROR
  })
  async findUserCompletedQuiz(@Param('email') email: string) {
    return await this.quizzesService.findQuizByUserEmail(
      email,
      QUIZ_TYPE.COMPLETED
    );
  }

  @UseGuards(JwtAuthGuard, new RoleGuard(Role.Admin))
  @ApiBearerAuth()
  @Get('/user-list')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ description: OPERATION_TYPE.ALL_USERS })
  @ApiOkResponse({ description: RESPONSE_MESSAGE.SUCCESS })
  @ApiNotFoundResponse({ description: RESPONSE_MESSAGE.NOT_FOUND })
  @ApiUnauthorizedResponse({ description: RESPONSE_MESSAGE.UNAUTHORIZED_USER })
  @ApiInternalServerErrorResponse({
    description: RESPONSE_MESSAGE.SERVER_ERROR
  })
  findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ description: OPERATION_TYPE.USER_BY_ID })
  @ApiOkResponse({ description: RESPONSE_MESSAGE.SUCCESS })
  @ApiNotFoundResponse({ description: RESPONSE_MESSAGE.NOT_FOUND })
  @ApiUnauthorizedResponse({ description: RESPONSE_MESSAGE.UNAUTHORIZED_USER })
  @ApiInternalServerErrorResponse({
    description: RESPONSE_MESSAGE.SERVER_ERROR
  })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, new RoleGuard(Role.Admin))
  @ApiBearerAuth()
  @Patch('/block-unblock/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ description: OPERATION_TYPE.UPDATE_USER })
  @ApiOkResponse({ description: RESPONSE_MESSAGE.SUCCESS })
  @ApiNotFoundResponse({ description: RESPONSE_MESSAGE.NOT_FOUND })
  @ApiUnauthorizedResponse({ description: RESPONSE_MESSAGE.UNAUTHORIZED_USER })
  @ApiInternalServerErrorResponse({
    description: RESPONSE_MESSAGE.SERVER_ERROR
  })
  async blockUnblockUser(@Param('id') id: string, @Body() updateUserDto: any) {
    return await this.usersService.update(id, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Patch('/update/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ description: OPERATION_TYPE.UPDATE_USER })
  @ApiOkResponse({ description: RESPONSE_MESSAGE.SUCCESS })
  @ApiNotFoundResponse({ description: RESPONSE_MESSAGE.NOT_FOUND })
  @ApiUnauthorizedResponse({ description: RESPONSE_MESSAGE.UNAUTHORIZED_USER })
  @ApiInternalServerErrorResponse({
    description: RESPONSE_MESSAGE.SERVER_ERROR
  })
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const { password } = updateUserDto;
    if (password) {
      const hashedpassword = hashPassword(password);
      return await this.usersService.update(id, { password: hashedpassword });
    }
    return await this.usersService.update(id, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Delete('/delete/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ description: OPERATION_TYPE.DELETE_USER })
  @ApiOkResponse({ description: RESPONSE_MESSAGE.SUCCESS })
  @ApiNotFoundResponse({ description: RESPONSE_MESSAGE.NOT_FOUND })
  @ApiUnauthorizedResponse({ description: RESPONSE_MESSAGE.UNAUTHORIZED_USER })
  @ApiInternalServerErrorResponse({
    description: RESPONSE_MESSAGE.SERVER_ERROR
  })
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
