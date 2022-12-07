import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateQuizDto {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  endedAt: Date;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  status: string;
}
