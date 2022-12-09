import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { CreateQuestionDto } from 'src/questions/dto/create-question.dto';

export class CreatePublicQuestionDto extends CreateQuestionDto{
  @ApiProperty({ type: String, required: true })
  @IsNotEmpty()
  name: string;
  
  @ApiProperty({ type: Boolean, default: false })
  @IsNotEmpty()
  isReviewed: boolean;
}
