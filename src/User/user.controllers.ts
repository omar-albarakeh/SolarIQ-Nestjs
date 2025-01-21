import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  UnauthorizedException,
  InternalServerErrorException,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { UserService } from './user.services';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto'
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: UserService) {}

  @Post('/signup')
  async signUp(
    @Body() signUpDto: SignUpDto,
  ): Promise<{ status: string; message: string; data: { token: string } }> {
    try {
      const token = await this.authService.signUp(signUpDto);
      return {
        status: 'success',
        message: 'User successfully registered.',
        data: { token },
      };
    } catch (error) {
      throw new InternalServerErrorException('Error during sign up', error.message);
    }
  }
}