import { Controller, Post, Body, Get, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Role } from '@prisma/client';

class RegisterDto {
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
    role?: Role;
}

class LoginDto {
    email: string;
    password: string;
}

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('register')
    async register(@Body() dto: RegisterDto) {
        return this.authService.register(
            dto.email,
            dto.password,
            dto.firstName,
            dto.lastName,
            dto.role,
        );
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Body() dto: LoginDto, @Request() req) {
        // User validated by LocalAuthGuard
        return this.authService.login(dto.email, dto.password);
    }

    @UseGuards(JwtAuthGuard)
    @Get('me')
    async getProfile(@Request() req) {
        return this.authService.getUserById(req.user.sub);
    }
}
