import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Time } from '../entities/quiz.entity';

export class UpdateQuizTime {
  @ApiProperty({ type: Time })
  @IsNotEmpty()
  timeCount: Time;
}
