import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  BadRequestException,
  Response
} from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags
} from '@nestjs/swagger';
import { API_TAG, AUTH, OPERATION_TYPE, RESPONSE_MESSAGE } from 'src/utilities/enums';
import { AdminAuthService } from './admin-auth.service';
import { AdminAuthDto } from './dto/admin-auth-dto';

@Controller('admin-auth')
@ApiTags(API_TAG.ADMIN_AUTH)
export class AdminAuthController {
  constructor(private readonly adminAuthService: AdminAuthService) {}

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ description: OPERATION_TYPE.ADMIN_LOG_IN })
  @ApiOkResponse({ description: RESPONSE_MESSAGE.SUCCESS })
  @ApiNotFoundResponse({ description: RESPONSE_MESSAGE.NOT_FOUND })
  @ApiInternalServerErrorResponse({
    description: RESPONSE_MESSAGE.SERVER_ERROR
  })
  async login(@Body() { email, password }: AdminAuthDto, @Response() res) {
    try {
      const { token } = await this.adminAuthService.login(email, password);
      return res.header(AUTH.AUTHORIZATION, token).send({
        success: true,
        token
      });
    } catch (err) {
      throw new BadRequestException({ error: { message: err.message } });
    }
  }
}
