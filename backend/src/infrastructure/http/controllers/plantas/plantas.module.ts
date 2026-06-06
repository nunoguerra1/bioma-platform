import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlantasService } from '../../../../core/use-cases/plant/plantas.service';
import { PlantasController } from './plantas.controller';
import { PlantaPostgresEntity } from '../../../database/entities/planta.postgres-entity';

@Module({
  imports: [TypeOrmModule.forFeature([PlantaPostgresEntity])],
  controllers: [PlantasController],
  providers: [PlantasService],
})
export class PlantasModule { }