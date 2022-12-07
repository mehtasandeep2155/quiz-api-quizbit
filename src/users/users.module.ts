import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User, UserSchema } from './entities/user.entity';
import { QuizzesModule } from 'src/quizzes/quizzes.module';
import { UserPerformanceModule } from 'src/user-performance/user-performance.module';

@Module({
  imports: [
    QuizzesModule,
    UserPerformanceModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    PassportModule,
    JwtModule.registerAsync({
      imports:[ConfigModule],
     useFactory:async () => ({
      secret:`${process.env.JWT_KEY}`
     }),
     inject:[ConfigService]
    })
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports:[UsersService]
})
export class UsersModule {}
