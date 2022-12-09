import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AdminService } from 'src/admin/admin.service';
import { ERROR_MESSAGE, Role } from 'src/utilities/enums';
import { comparePassword } from 'src/utilities/functions';

@Injectable()
export class AdminAuthService {
  constructor(
    private adminService: AdminService,
    private jwtTokenService: JwtService
  ) {}

  async login(adminEmail: string, password: string): Promise<any> {
    const admin = await this.adminService.findAdminByEmail(adminEmail);

    if (!admin) {
      throw new UnauthorizedException(ERROR_MESSAGE.LOGIN_FAILED);
    }
    if (!comparePassword(password, admin.password)) {
      throw new UnauthorizedException(ERROR_MESSAGE.WRONG_PASSWORD);
    }
    return {
      token: this.jwtTokenService.sign({
        _id: admin._id,
        email: admin.email,
        role: Role.Admin
      })
    };
  }
}
