import { Controller, Post, Body } from '@nestjs/common';
import { UsuariosService } from '../../../../core/use-cases/usuarios/usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) { }

  @Post('registrar')
  async registrar(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuariosService.registrar(createUsuarioDto);
  }
}