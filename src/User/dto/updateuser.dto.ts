import { IsNotEmpty, IsEmail, IsString, MinLength, Matches, IsEnum } from 'class-validator';
import { UserType } from '../user_type.enum';

export class SignUpDto {
  @IsNotEmpty({ message: 'Name is required' })
  @IsString({ message: 'Name must be a string' })
  readonly name?: string;

  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Invalid email address' })
  readonly email?: string;

  @IsNotEmpty({ message: 'Password is required' })
  @IsString({ message: 'Password must be a string' })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  @Matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{6,}$/, {
    message:
      'Password must contain at least one uppercase letter, one number, and one special character',
  })
  readonly password?: string;

  @IsNotEmpty({ message: 'User type is required' })
  @IsEnum(UserType, { message: 'Invalid user type. Valid options are: Admin, Engineer, User' })
  readonly type?: UserType;

  @IsNotEmpty({ message: 'Phone is required' })
  @Matches(/^\d{8}$/, { message: 'Phone must be a valid 8-digit number' })
  readonly phone?: string;

  @IsNotEmpty({ message: 'Address is required' })
  @IsString({ message: 'Address must be a string' })
  readonly address?: string;
}