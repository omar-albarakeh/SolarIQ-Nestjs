import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { UserRepository } from './user.repositories';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  private async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }



 
}