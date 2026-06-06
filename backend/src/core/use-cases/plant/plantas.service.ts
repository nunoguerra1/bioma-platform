import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PlantaPostgresEntity } from '../../../infrastructure/database/entities/planta.postgres-entity';

@Injectable()
export class PlantasService {
  constructor(
    @InjectRepository(PlantaPostgresEntity)
    private readonly plantaRepository: Repository<PlantaPostgresEntity>,
  ) { }

  async create(dadosDaPlanta: any) {
    const novaPlanta = this.plantaRepository.create(dadosDaPlanta);
    return await this.plantaRepository.save(novaPlanta);
  }

  async findAll() {
    return await this.plantaRepository.find();
  }
}