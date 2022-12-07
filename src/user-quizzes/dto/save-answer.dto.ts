import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class SaveAnswerDto {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  quizId: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  user: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  question_id: string;

  @ApiProperty({ type: Array })
  @IsNotEmpty()
  options: any;

  @ApiProperty({ type: Array })
  @IsNotEmpty()
  stackWiseDetails: any;
}
