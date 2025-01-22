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



  
}