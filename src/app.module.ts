import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuestionsModule } from './questions/questions.module';
import { UsersModule } from './users/users.module';
import { QuizzesModule } from './quizzes/quizzes.module';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { AdminAuthModule } from './admin-auth/admin-auth.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { UserQuizzesModule } from './user-quizzes/user-quizzes.module';
import { UserPerformanceModule } from './user-performance/user-performance.module';
import { PublicQuestionModule } from './public-questions/public-question.module';
import { mailerConfig,db } from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env'
    }),
    MongooseModule.forRoot(db()),
    MailerModule.forRoot(mailerConfig),
    AuthModule,
    UsersModule,
    AdminAuthModule,
    AdminModule,
    DashboardModule,
    QuestionsModule,
    QuizzesModule,
    UserQuizzesModule,
    UserPerformanceModule,
    PublicQuestionModule,
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
