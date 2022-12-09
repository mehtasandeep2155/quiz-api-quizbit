import {
  Controller,
  Post,
  Body,
  BadRequestException,
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
import { AdminAuthService } from './admin-auth.service';
import { AdminAuthDto } from './dto/admin-auth-dto';

@Controller(CONTROLLER_DEF.ADMIN_AUTH)
@ApiTags(API_TAG.ADMIN_AUTH)
export class AdminAuthController {
  constructor(private readonly adminAuthService: AdminAuthService) {}

  @Post('/login')
  @ApiDescription(OPERATION_TYPE.ADMIN_LOG_IN)
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
