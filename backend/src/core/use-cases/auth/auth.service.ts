import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsuariosService } from '../usuarios/usuarios.service';

@Injectable()
export class AuthService {
    constructor(
        private usuariosService: UsuariosService,
        private jwtService: JwtService
    ) { }

    async login(email: string, senhaPlana: string) {
        const usuario = await this.usuariosService.buscarPorEmail(email);
        if (!usuario) {
            throw new UnauthorizedException('Email ou senha incorretos.');
        }

        const senhaValida = await bcrypt.compare(senhaPlana, usuario.senhaHash);
        if (!senhaValida) {
            throw new UnauthorizedException('Email ou senha incorretos.');
        }

        const payload = { sub: usuario.id, email: usuario.email };

        return {
            access_token: await this.jwtService.signAsync(payload),
            usuario: { id: usuario.id, nome: usuario.nome, email: usuario.email }
        };
    }
}