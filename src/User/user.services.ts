import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { UserRepository } from './user.repositories';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  private async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  private generateToken(payload: { id: string; email: string; name: string; type: string; phone: string; address: string }): string {
    return this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '1h',
    });
  }

  private generateRefreshToken(payload: { id: string }): string {
    return this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: '7d',
    });
  }

  private async verifyPassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }

  private createUserPayload(user: any): { id: string; email: string; name: string; type: string; phone: string; address: string } {
    return {
      id: user.id.toString(),
      email: user.email,
      name: user.name,
      type: user.type,
      phone: user.phone,
      address: user.address,
    };
  }

  async signUp(signUpDto: SignUpDto): Promise<string> {
    const { email, password, name, type = 'user', phone, address } = signUpDto;

    if (await this.userRepository.isEmailTaken(email)) {
      throw new ConflictException('Email is already registered.');
    }

    const hashedPassword = await this.hashPassword(password);
    const user = await this.userRepository.createUser({
      name,
      email,
      password: hashedPassword,
      type,
      phone,
      address,
    });

    const tokenPayload = this.createUserPayload(user);
    return this.generateToken(tokenPayload);
  }

  async login(loginDto: LoginDto): Promise<{ accessToken: string; refreshToken: string }> {
    const { email, password } = loginDto;
    const user = await this.userRepository.findUserByEmail(email);

    if (!user || !(await this.verifyPassword(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    const accessToken = this.generateToken(this.createUserPayload(user));
    const refreshToken = this.generateRefreshToken({ id: user.id.toString() });

    return { accessToken, refreshToken };
  }
}