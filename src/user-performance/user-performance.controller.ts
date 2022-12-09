import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UserPerformanceService } from './user-performance.service';
import { ApiTags } from '@nestjs/swagger';
import { OPERATION_TYPE } from 'src/utilities/enums';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiDescription } from 'src/decorators/api-description.decorator';

@Controller('user-performance')
@ApiTags('Users Performance')
export class UserPerformanceController {
  constructor(
    private readonly userPerformanceService: UserPerformanceService
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiDescription(OPERATION_TYPE.UPDATE_QUIZ)
  async findOne(@Param('id') id: string) {
    return await this.userPerformanceService.findByField({
      userId: id
    });
  }
}
