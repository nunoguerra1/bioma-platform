import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosService } from '../../../../core/use-cases/usuarios/usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { UsuarioPostgresEntity } from '../../../database/entities/usuario.postgres-entity';

@Module({
  imports: [TypeOrmModule.forFeature([UsuarioPostgresEntity])],
  controllers: [UsuariosController],
  providers: [UsuariosService],
  exports: [UsuariosService],
})
export class UsuariosModule { }