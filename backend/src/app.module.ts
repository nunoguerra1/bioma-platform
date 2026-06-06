import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlantasModule } from './infrastructure/http/controllers/plantas/plantas.module';
import { PlantaPostgresEntity } from './infrastructure/database/entities/planta.postgres-entity';
import { UsuariosModule } from './infrastructure/http/controllers/usuarios/usuarios.module';
import { UsuarioPostgresEntity } from './infrastructure/database/entities/usuario.postgres-entity';
import { AuthModule } from './infrastructure/http/controllers/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'bioma_user',
      password: 'bioma_password',
      database: 'bioma_db',
      entities: [UsuarioPostgresEntity, PlantaPostgresEntity],
      synchronize: true,
    }),
    PlantasModule,
    UsuariosModule,
    AuthModule,
  ],
})
export class AppModule { }