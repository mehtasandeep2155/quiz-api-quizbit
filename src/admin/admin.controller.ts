import { Controller, Get, Body, Patch, Param, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RoleGuard } from 'src/auth/role.guard';
import { ApiDescription } from 'src/decorators/api-description.decorator';
import { API_TAG, OPERATION_TYPE, Role } from 'src/utilities/enums';
import { AdminService } from './admin.service';

@Controller('admin')
@ApiTags(API_TAG.ADMIN)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @UseGuards(JwtAuthGuard, new RoleGuard(Role.Admin))
  @Get(':id')
  @ApiDescription(OPERATION_TYPE.ADMIN_BY_ID)
  async findOne(@Param('id') id: string) {
    return await this.adminService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, new RoleGuard(Role.Admin))
  @Patch('/update/:id')
  @ApiDescription(OPERATION_TYPE.UPDATE_ADMIN)
  update(@Param('id') id: string, @Body() updateAdminDto: any) {
    return this.adminService.update(id, updateAdminDto);
  }
}
