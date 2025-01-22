import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '../Auth/user.repositories';
import { UpdateSolarInfoDto } from './UpdateSolarInfoDto';
import {SolarInfoRepository} from './SolarinfoRepository';

@Injectable()
export class SolarInfoService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userRepository: UserRepository,
    private readonly SolarInfoRepository : SolarInfoRepository
  ) {}

  async markSolarInfoComplete(token: string): Promise<void> {
    try {
      const decoded = this.jwtService.verify(token, { secret: process.env.JWT_SECRET });

      const user = await this.userRepository.findUserById(decoded.id);

      if (!user) {
        throw new UnauthorizedException('User not found.');
      }

      await this.userRepository.updateUser(user.id.toString(), { isSolarInfoComplete: true });
    } catch (error) {
      console.error('Mark solar info complete error:', error.message);
      throw new UnauthorizedException('Invalid or expired token.');
    }
  }

  async updateSolarInfo(token: string, updateSolarInfoDto: UpdateSolarInfoDto): Promise<any> {
    try {
      const decoded = this.jwtService.verify(token, { secret: process.env.JWT_SECRET });

      const user = await this.userRepository.findUserById(decoded.id);

      if (!user) {
        throw new UnauthorizedException('User not found.');
      }

      const updatedUser = await this.SolarInfoRepository.updateSolarInfo(user.id.toString(), updateSolarInfoDto);

      if (!updatedUser) {
        throw new InternalServerErrorException('Failed to update solar information.');
      }

      return updatedUser;
    } catch (error) {
      console.error('Update solar info error:', error.message);
      throw new UnauthorizedException('Invalid or expired token.');
    }
  }
}