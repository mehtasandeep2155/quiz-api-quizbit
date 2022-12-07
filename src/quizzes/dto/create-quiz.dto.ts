import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateQuizDto {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ type: Array })
  @IsNotEmpty()
  quizStack: string[];

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  difficultyLevel: string;

  @ApiProperty({ type: Boolean })
  @IsNotEmpty()
  @IsBoolean()
  assignedByAdmin: boolean;
}
