import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from '../../../../core/use-cases/auth/auth.service';
import { AuthController } from './auth.controller';
import { UsuariosModule } from '../usuarios/usuarios.module';

@Module({
    imports: [
        UsuariosModule,
        JwtModule.register({
            global: true,
            secret: 'CHAVE_SUPER_SECRETA_DO_BIOMA',
            signOptions: { expiresIn: '1d' },
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule { }