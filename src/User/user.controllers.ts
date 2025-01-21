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

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<{
    status: string;
    message: string;
    data: { accessToken: string };
  }> {
    try {
      const { accessToken, refreshToken } = await this.authService.login(loginDto);

      res.cookie('refresh_token', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      return {
        status: 'success',
        message: 'Login successful.',
        data: { accessToken },
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid login credentials.', error.message);
    }
  }
}