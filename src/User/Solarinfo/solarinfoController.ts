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

  @Post('/mark-solar-info-complete')
  async markSolarInfoComplete(
    @Req() req: Request,
  ): Promise<{ status: string; message: string }> {
    try {
      const authorizationHeader = req.headers.authorization;
      if (!authorizationHeader) {
        throw new UnauthorizedException('Authorization header is missing.');
      }
      const token = this.tokenService.extractToken(authorizationHeader);
      await this.solarInfoService.markSolarInfoComplete(token);
      return {
        status: 'success',
        message: 'Solar information marked as complete.',
      };
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to mark solar info complete.');
    }
  }

  @Post('/update-solar-info')
  async updateSolarInfo(
    @Body() updateSolarInfoDto: UpdateSolarInfoDto,
    @Req() req: Request,
  ): Promise<{ status: string; message: string }> {
    try {
      const authorizationHeader = req.headers.authorization;
      if (!authorizationHeader) {
        throw new UnauthorizedException('Authorization header is missing.');
      }
      const token = this.tokenService.extractToken(authorizationHeader);
      await this.solarInfoService.updateSolarInfo(token, updateSolarInfoDto);
      return {
        status: 'success',
        message: 'Solar information updated successfully.',
      };
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to update solar info.');
    }
  }
}