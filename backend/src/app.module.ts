import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlantasModule } from './infrastructure/http/controllers/plantas/plantas.module';
import { PlantaPostgresEntity } from './infrastructure/database/entities/planta.postgres-entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'bioma_user',
      password: 'bioma_password',
      database: 'bioma_db',
      entities: [PlantaPostgresEntity],
      synchronize: true,
    }),
    PlantasModule,
  ],
})
export class AppModule { }