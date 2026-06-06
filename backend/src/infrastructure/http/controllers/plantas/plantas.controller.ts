import { Controller, Get, Post, Body } from '@nestjs/common';
import { PlantasService } from '../../../../core/use-cases/plant/plantas.service';
import { CreatePlantaDto } from './dto/create-planta.dto';

@Controller('plantas')
export class PlantasController {
  constructor(private readonly plantasService: PlantasService) { }

  @Post()
  async create(@Body() createPlantaDto: CreatePlantaDto) {
    return this.plantasService.create(createPlantaDto);
  }

  @Get()
  async findAll() {
    return this.plantasService.findAll();
  }
}