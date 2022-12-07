import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  HttpCode,
  HttpStatus,
  UseGuards
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RoleGuard } from 'src/auth/role.guard';
import { API_TAG, OPERATION_TYPE, RESPONSE_MESSAGE, Role } from 'src/utilities/enums';
import { AdminService } from './admin.service';

@Controller('admin')
@ApiTags(API_TAG.ADMIN)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @UseGuards(JwtAuthGuard, new RoleGuard(Role.Admin))
  @ApiBearerAuth()
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ description: OPERATION_TYPE.ADMIN_BY_ID })
  @ApiOkResponse({ description: RESPONSE_MESSAGE.SUCCESS })
  @ApiNotFoundResponse({ description: RESPONSE_MESSAGE.NOT_FOUND })
  @ApiInternalServerErrorResponse({
    description: RESPONSE_MESSAGE.SERVER_ERROR
  })
  async findOne(@Param('id') id: string) {
    return await this.adminService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, new RoleGuard(Role.Admin))
  @ApiBearerAuth()
  @Patch('/update/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ description: OPERATION_TYPE.UPDATE_ADMIN })
  @ApiOkResponse({ description: RESPONSE_MESSAGE.SUCCESS })
  @ApiNotFoundResponse({ description: RESPONSE_MESSAGE.NOT_FOUND })
  @ApiInternalServerErrorResponse({
    description: RESPONSE_MESSAGE.SERVER_ERROR
  })
  update(@Param('id') id: string, @Body() updateAdminDto: any) {
    return this.adminService.update(id, updateAdminDto);
  }
}
