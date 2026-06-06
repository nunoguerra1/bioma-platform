import { Test, TestingModule } from '@nestjs/testing';
import { PlantasController } from '../infrastructure/http/controllers/plantas/plantas.controller';
import { PlantasService } from '../core/use-cases/plant/plantas.service';

describe('PlantasController', () => {
  let controller: PlantasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlantasController],
      providers: [PlantasService],
    }).compile();

    controller = module.get<PlantasController>(PlantasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
