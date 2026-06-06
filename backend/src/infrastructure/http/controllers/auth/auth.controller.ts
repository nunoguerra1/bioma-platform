import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from '../../../../core/use-cases/auth/auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('login')
    async login(@Body() body: any) {
        return this.authService.login(body.email, body.senha);
    }
}