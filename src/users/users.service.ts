import { InjectModel } from '@nestjs/mongoose';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { hashPassword } from 'src/utilities/functions';
import { BaseService } from 'src/utilities/base.service';
import { EMAIL_SUBJECT, ERROR_MESSAGE, Role } from 'src/utilities/enums';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './entities/user.entity';
import { UserPerformanceService } from 'src/user-performance/user-performance.service';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { resetPasswordMail } from 'src/utilities/email-templates';
import { refreshTokenExpiresIn, refreshTokenSecret, tokenExpiresIn } from 'src/config';

@Injectable()
export class UsersService extends BaseService<UserDocument> {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtTokenService: JwtService,
    private userPerformanceService: UserPerformanceService,
    private mailerService: MailerService
  ) {
    super(userModel);
  }

  async create(createUserDto: CreateUserDto): Promise<any> {
    const { email, password } = createUserDto;
    const hashedPassword = await hashPassword(password);
    const user = await this.userModel.findOne({ email });
    if (user)
      throw new HttpException(
        `User of ${email} already exists`,
        HttpStatus.BAD_REQUEST
      );
    Object.assign(createUserDto, {
      password: hashedPassword,
      isBlocked: false
    });
    const newUser = new this.userModel(createUserDto);
    await this.userPerformanceService.createPerformance({
      userId: newUser?._id.toString(),
      email: newUser?.email,
      performance: []
    });
    await newUser.save();
    const token = this.jwtTokenService.sign({
      _id: newUser.id,
      email: newUser.email,
      role: Role.User
    },{
      expiresIn: tokenExpiresIn()
    })
    const refreshToken= this.jwtTokenService.sign({
      _id: newUser.id,
      email: newUser.email,
    }, {
      secret: refreshTokenSecret(),
      expiresIn: refreshTokenExpiresIn()
    })
    await this.updateUserRefreshToken(newUser.id,refreshToken)
    return {
      token,
      refreshToken
    };
  }

  async findOneUser(email: string): Promise<User> {
    return await this.userModel.findOne({ email: email }).exec();
  }

  async updateUserRefreshToken(id: string, refreshToken: string) {
    return await this.userModel.findByIdAndUpdate(id, { refreshToken }, {
      new: true
    })
  }

  async sentPasswordLink(resetPassword: ResetPasswordDto) {
    const { email } = resetPassword
    const user = await this.findOneUser(email)
    if (!user) throw new HttpException(
      `No User with ${email}`,
      HttpStatus.BAD_REQUEST
    );
    if (user.isBlocked) throw new HttpException(
      ERROR_MESSAGE.USER_BLOCKED,
      HttpStatus.BAD_REQUEST
    );
    try {
      const secretKey = user.password + "_" + user.createdAt
      const token = this.jwtTokenService.sign({ id: user._id }, { secret: secretKey, expiresIn: 3600 })
      const { name, _id } = user
      return this.mailerService.sendMail({
        to: user.email,
        subject: EMAIL_SUBJECT.RESET_PASSWORD,
        html: resetPasswordMail(name, _id, token),
      });
    } catch (error) {
      throw new Error('Something went wrong');
    }
  }
}