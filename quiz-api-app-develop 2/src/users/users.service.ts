import { InjectModel } from '@nestjs/mongoose';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { hashPassword } from 'src/utilities/functions';
import { BaseService } from 'src/utilities/base.service';
import { Role } from 'src/utilities/enums';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './entities/user.entity';
import { UserPerformanceService } from 'src/user-performance/user-performance.service';

@Injectable()
export class UsersService extends BaseService<UserDocument> {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtTokenService: JwtService,
    private userPerformanceService: UserPerformanceService
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
    return {
      token: this.jwtTokenService.sign({
        _id: newUser.id,
        email: newUser.email,
        role: Role.User
      })
    };
  }

  async findOneUser(email: string): Promise<User> {
    return await this.userModel.findOne({ email: email }).exec();
  }
}
