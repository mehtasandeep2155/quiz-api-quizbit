import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserPerformanceDto {
  @ApiProperty({ type: String, required: true })
  @IsNotEmpty()
  userId: string;

  @ApiProperty({ type: String, required: true })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ type: Array, required: true })
  @IsNotEmpty()
  performance: Array<any>;
}
