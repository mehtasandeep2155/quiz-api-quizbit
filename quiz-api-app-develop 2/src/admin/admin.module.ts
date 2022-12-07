import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { Admin, AdminSchema } from './entities/admin.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Admin.name, schema: AdminSchema }]),
    PassportModule,
    JwtModule.registerAsync({
      imports:[ConfigModule],
     useFactory:async () => ({
      secret:`${process.env.JWT_KEY}`
     }),
     inject:[ConfigService]
    })
  ],
  controllers: [AdminController],
  providers: [AdminService],
  exports:[AdminService]
 
})
export class AdminModule {}
