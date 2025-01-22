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
    Param,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { UserService } from './user.services';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto'
@Controller('User')
export class UserController {
  constructor(private readonly UserService: UserService) {}

  @Post('/signup')
  async signUp(
    @Body() signUpDto: SignUpDto,
  ): Promise<{ status: string; message: string; data: { token: string } }> {
    try {
      const token = await this.UserService.signUp(signUpDto);
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
      const { accessToken, refreshToken } = await this.UserService.login(loginDto);

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

     @Post('/block/:userId')
  @UseGuards(AuthGuard('jwt')) 
  async blockUser(@Param('userId') userId: string): Promise<{ status: string; message: string }> {
    try {
      const user = await this.UserService.blockUser(userId);
      return {
        status: 'success',
        message: `User ${user.name} successfully blocked.`,
      };
    } catch (error) {
      throw new InternalServerErrorException('Failed to block user', error.message);
    }
  }
}