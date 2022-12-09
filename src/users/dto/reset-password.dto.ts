import {
    IsEmail,
    IsNotEmpty,
    IsString,
    Matches,
    MaxLength,
    MinLength,
  } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { passwordRegex } from 'src/utilities/regex';
  
  export class ResetPasswordDto {
    @ApiProperty({ type: String, required: true })
    @IsNotEmpty()
    @IsEmail()
    email: string;
  }

  export class ResetNewPasswordDto {
    @ApiProperty({ type: String, required: true })
    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    @Matches(passwordRegex)
    @IsNotEmpty()
    password: string;
  }