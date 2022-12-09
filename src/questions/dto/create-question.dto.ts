import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, ValidateNested } from 'class-validator';
import { Option } from '../entities/question.entity';

export class CreateQuestionDto {
  @ApiProperty({ type: String, required: true })
  @IsNotEmpty()
  question: string;

  @ApiProperty({ type: String, required: true })
  @IsNotEmpty()
  category: string;

  @ApiProperty({ type: String, required: true })
  @IsNotEmpty()
  questionType: string;

  @ApiProperty({ type: String, required: true })
  @IsNotEmpty()
  difficultyLevel: string;

  @ApiProperty({ type: [Option] })
  @Type(() => Option)
  @ValidateNested({ each: true })
  @IsNotEmpty()
  options: Option[];

  @ApiProperty({ type: Array })
  @IsNotEmpty()
  correctAnswers: string[];

}
