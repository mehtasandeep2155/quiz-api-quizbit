import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { passwordRegex } from 'src/utilities/regex';
import { Exclude } from 'class-transformer';

export class CreateUserDto {
  @ApiProperty({ type: String, required: true })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ type: String, required: true })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ type: String, required: true })
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Matches(passwordRegex)
  @IsNotEmpty()
  password: string;

  @ApiProperty({ type: String, required: true })
  @IsNotEmpty()
  githubLink: string;

  @ApiProperty({ type: String, required: true })
  @IsNotEmpty()
  linkedInLink: string;

  @ApiProperty({ type: String, required: true })
  @IsNotEmpty()
  bio: string;

  @ApiProperty({ type: Boolean })
  isBlocked?: boolean;

  @ApiProperty({ type: String })
  avatar: string;

  @ApiProperty({ type: Number })
  mobileNumber: number;

  @ApiProperty({ type: String, required: true,default:null })
  @Exclude()
  refreshToken: string;
}
