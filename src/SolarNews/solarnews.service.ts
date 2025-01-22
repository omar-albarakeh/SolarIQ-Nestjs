import { Injectable } from '@nestjs/common';
import { SolarNewsRepository } from './solarnews.repository';
import { CreateSolarNewsDto } from './dto/addsolarnews';
import { UpdateSolarNewsDto } from './dto/UpdateSolarNewsDto';

@Injectable()
export class SolarNewsService {
  constructor(private readonly solarNewsRepository: SolarNewsRepository) {}

  async create(createSolarNewsDto: CreateSolarNewsDto) {
    return this.solarNewsRepository.create(createSolarNewsDto);
  }

  async findAll() {
    return this.solarNewsRepository.findAll();
  }

}