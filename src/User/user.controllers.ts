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

  
}