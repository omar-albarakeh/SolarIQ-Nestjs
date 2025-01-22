import { Body, Controller, Post, Req, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { SolarInfoService } from './Solarinfoservices';
import { UpdateSolarInfoDto } from './UpdateSolarInfoDto';
import { Request } from 'express';
import { TokenService } from '../Auth/TokenService';

@Controller('solar-info')
export class SolarInfoController {
  constructor(
    private readonly solarInfoService: SolarInfoService,
    private readonly tokenService: TokenService,
  ) {}


 
}