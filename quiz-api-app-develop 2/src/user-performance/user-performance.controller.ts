import {
  Controller,
  Get,
  Param,
  HttpStatus,
  HttpCode,
  UseGuards
} from '@nestjs/common';
import { UserPerformanceService } from './user-performance.service';
import {
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse
} from '@nestjs/swagger';
import { OPERATION_TYPE, RESPONSE_MESSAGE } from 'src/utilities/enums';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('user-performance')
@ApiTags('Users Performance')
export class UserPerformanceController {
  constructor(
    private readonly userPerformanceService: UserPerformanceService
  ) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ description: OPERATION_TYPE.UPDATE_QUIZ })
  @ApiOkResponse({ description: RESPONSE_MESSAGE.SUCCESS })
  @ApiNotFoundResponse({ description: RESPONSE_MESSAGE.NOT_FOUND })
  @ApiUnauthorizedResponse({ description: RESPONSE_MESSAGE.UNAUTHORIZED_USER })
  @ApiInternalServerErrorResponse({
    description: RESPONSE_MESSAGE.SERVER_ERROR
  })
  async findOne(@Param('id') id: string) {
    return await this.userPerformanceService.findByField({
      userId: id
    });
  }
}
