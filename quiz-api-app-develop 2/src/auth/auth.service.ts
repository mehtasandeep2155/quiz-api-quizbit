import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { ERROR_MESSAGE, Role } from 'src/utilities/enums';
import { comparePassword } from 'src/utilities/functions';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtTokenService: JwtService
  ) {}

  async login(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneUser(email);

    if (!user) {
      throw new UnauthorizedException(ERROR_MESSAGE.USER_NOT_FOUND);
    }
    if (user?.isBlocked) {
      throw new UnauthorizedException(ERROR_MESSAGE.USER_BLOCKED);
    }
    if (!comparePassword(pass, user.password)) {
      throw new UnauthorizedException(ERROR_MESSAGE.WRONG_PASSWORD);
    }
    return {
      token: this.jwtTokenService.sign({
        _id: user._id,
        email: user.email,
        role: Role.User
      })
    };
  }
}
