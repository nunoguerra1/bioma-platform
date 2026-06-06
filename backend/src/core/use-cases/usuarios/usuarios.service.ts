import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UsuarioPostgresEntity } from '../../../infrastructure/database/entities/usuario.postgres-entity';
import { CreateUsuarioDto } from '../../../infrastructure/http/controllers/usuarios/dto/create-usuario.dto';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(UsuarioPostgresEntity)
    private readonly usuarioRepository: Repository<UsuarioPostgresEntity>,
  ) { }

  async registrar(dados: CreateUsuarioDto) {
    const usuarioExiste = await this.usuarioRepository.findOne({ where: { email: dados.email } });
    if (usuarioExiste) {
      throw new ConflictException('Este email já está em uso no nosso ecossistema.');
    }

    const salt = await bcrypt.genSalt(10);
    const senhaHash = await bcrypt.hash(dados.senha, salt);

    const novoUsuario = this.usuarioRepository.create({
      nome: dados.nome,
      email: dados.email,
      senhaHash: senhaHash,
    });

    const usuarioSalvo = await this.usuarioRepository.save(novoUsuario);

    return {
      id: usuarioSalvo.id,
      nome: usuarioSalvo.nome,
      email: usuarioSalvo.email,
    };
  }

  async buscarPorEmail(email: string) {
    return this.usuarioRepository.findOne({ where: { email } });
  }
}
