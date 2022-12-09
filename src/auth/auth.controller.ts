import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Response
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApiDescription } from 'src/decorators/api-description.decorator';
import {
  API_TAG,
  AUTH,
  CONTROLLER_DEF,
  OPERATION_TYPE
} from 'src/utilities/enums';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { RefreshTokenDto } from './dto/refreshToken.dto';

@Controller(CONTROLLER_DEF.AUTH_SERVICES)
@ApiTags(API_TAG.USER_AUTHENTICATION)
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/login')
  @ApiDescription(OPERATION_TYPE.LOG_IN)
  async login(@Body() { email, password }: AuthDto, @Response() res) {
    try {
      const { token,refreshToken } = await this.authService.login(email, password);
      return res.header(AUTH.AUTHORIZATION, token).send({
        success: true,
        token,
        refreshToken
      });
    } catch (err) {
      throw new BadRequestException({ error: { message: err.message } });
    }
  }

  @Post('/refresh-token')
  @ApiDescription(OPERATION_TYPE.LOG_IN)
  async refreshToken(@Body() { refreshToken }: RefreshTokenDto) {
    try {
     return await this.authService.getNewToken(refreshToken)
    } catch (err) {
      throw new BadRequestException({ error: { message: err.message } });
    }
  }
}
