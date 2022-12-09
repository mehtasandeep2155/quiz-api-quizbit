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
  Response,
  HttpException
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ApiTags } from '@nestjs/swagger';
import {
  API_TAG,
  AUTH,
  CONTROLLER_DEF,
  ERROR_MESSAGE,
  OPERATION_TYPE,
  QUIZ_TYPE,
  Role
} from 'src/utilities/enums';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RoleGuard } from 'src/auth/role.guard';
import { QuizzesService } from 'src/quizzes/quizzes.service';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { hashPassword } from 'src/utilities/functions';
import { ApiDescription } from 'src/decorators/api-description.decorator';
import { ResetNewPasswordDto, ResetPasswordDto } from './dto/reset-password.dto';
@Controller(CONTROLLER_DEF.USERS_SERVICES)
@ApiTags(API_TAG.USERS_CRUD)
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly quizzesService: QuizzesService,
    private jwtService: JwtService,
  ) { }

  @Post('/register')
  @ApiDescription(OPERATION_TYPE.NEW_USER)
  async create(@Body() createUserDto: CreateUserDto, @Response() res) {
    const { token,refreshToken } = await this.usersService.create(createUserDto);
    return res.header(AUTH.AUTHORIZATION, token).send({
      success: true,
      token,
      refreshToken
    });
  }
  @Post('/forgot-password')
  async sentResetPasswordLink(@Body() resetPassword: ResetPasswordDto) {
    return await this.usersService.sentPasswordLink(resetPassword)
  }

  @Post('/set-password/:id/:token')
  async setNewPassword(@Param('id') id: string, @Param('token') token: string, @Body() updatePasswordDto: ResetNewPasswordDto) {
    const user = await this.usersService.findOne(id)
    const secretKey = user.password + "_" + user.createdAt
    try {
      const userVerified: any = this.jwtService.verify(token, { secret: secretKey })
      if (userVerified.id === id) {
        const hashedPassword = hashPassword(updatePasswordDto.password);
        Object.assign(updatePasswordDto, {
          password: hashedPassword
        })
        return await this.usersService.update(id, { password: updatePasswordDto.password })
      }
    } catch (error) {
      throw new HttpException(
        ERROR_MESSAGE.INVALID_TOKEN,
        HttpStatus.BAD_REQUEST
      ); 
      }
    } 
  

  @UseGuards(JwtAuthGuard)
  @Get('/pending-quiz/:email')
  @ApiDescription(OPERATION_TYPE.GET_USER_PENDING_QUIZ)
  async findUserPendingQuiz(@Param('email') email: string) {
    return await this.quizzesService.findQuizByUserEmail(
      email,
      QUIZ_TYPE.PENDING
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('/completed-quiz/:email')
  @ApiDescription(OPERATION_TYPE.GET_USER_COMPLETED_QUIZ)
  async findUserCompletedQuiz(@Param('email') email: string) {
    return await this.quizzesService.findQuizByUserEmail(
      email,
      QUIZ_TYPE.COMPLETED
    );
  }

  @UseGuards(JwtAuthGuard, new RoleGuard(Role.Admin))
  @Get('/user-list')
  @ApiDescription(OPERATION_TYPE.ALL_USERS)
  findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiDescription(OPERATION_TYPE.USER_BY_ID)
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, new RoleGuard(Role.Admin))
  @Patch('/block-unblock/:id')
  @ApiDescription(OPERATION_TYPE.UPDATE_USER)
  async blockUnblockUser(@Param('id') id: string, @Body() updateUserDto: any) {
    return await this.usersService.update(id, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/update/:id')
  @HttpCode(HttpStatus.OK)
  @ApiDescription(OPERATION_TYPE.UPDATE_USER)
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const { password } = updateUserDto;
    if (password) {
      const hashedpassword = hashPassword(password);
      return await this.usersService.update(id, { password: hashedpassword });
    }
    return await this.usersService.update(id, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/delete/:id')
  @ApiDescription(OPERATION_TYPE.DELETE_USER)
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  @Get('/logout/:id')
  logout(@Param('id') id: string){
    return this.usersService.updateUserRefreshToken(id,null)
  }
}
