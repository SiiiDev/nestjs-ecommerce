import { IsEmail, IsNotEmpty, MinLength, IsOptional } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsOptional()
  @IsNotEmpty()
  name?: string;

  @MinLength(6, { message: 'Password must be at least 6 characters' })
  password: string;
}