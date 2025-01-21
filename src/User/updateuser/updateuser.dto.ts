import { IsOptional, IsString, MinLength, Matches, IsEnum } from 'class-validator';
import { UserType } from '../Auth/user_type.enum';

export class UpdateUserProfileDto {
  @IsOptional()
  @IsString({ message: 'Name must be a string' })
  readonly name?: string;

  @IsOptional()
  @IsString({ message: 'Email must be a string' })
  readonly email?: string;

  @IsOptional()
  @IsString({ message: 'Password must be a string' })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  @Matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{6,}$/, {
    message:
      'Password must contain at least one uppercase letter, one number, and one special character',
  })
  readonly password?: string;

  @IsOptional()
  @IsEnum(UserType, { message: 'Invalid user type. Valid options are: Admin, Engineer, User' })
  readonly type?: UserType;

  @IsOptional()
  @Matches(/^\d{8}$/, { message: 'Phone must be a valid 8-digit number' })
  readonly phone?: string;

  @IsOptional()
  @IsString({ message: 'Address must be a string' })
  readonly address?: string;
}