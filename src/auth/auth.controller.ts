import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Response
} from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags
} from '@nestjs/swagger';
import { AUTH, OPERATION_TYPE, RESPONSE_MESSAGE } from 'src/utilities/enums';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
@ApiTags('User Authentication')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ description: OPERATION_TYPE.LOG_IN })
  @ApiOkResponse({ description: RESPONSE_MESSAGE.SUCCESS })
  @ApiNotFoundResponse({ description: RESPONSE_MESSAGE.NOT_FOUND })
  @ApiInternalServerErrorResponse({
    description: RESPONSE_MESSAGE.SERVER_ERROR
  })
  async login(@Body() { email, password }: AuthDto, @Response() res) {
    try {
      const { token } = await this.authService.login(email, password);
      return res.header(AUTH.AUTHORIZATION, token).send({
        success: true,
        token
      });
    } catch (err) {
      throw new BadRequestException({ error: { message: err.message } });
    }
  }
}
