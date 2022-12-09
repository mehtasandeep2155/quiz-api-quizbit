import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RefreshTokenDto {
  @ApiProperty({ type: String, required: true })
  @IsNotEmpty()
  @IsString()
  refreshToken: string;
}
