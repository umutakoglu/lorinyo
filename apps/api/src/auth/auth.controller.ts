import { Controller, Post, Get, Put, Body, UseGuards, Request } from '@nestjs/common';
import { Request as ExpressRequest } from 'express';
import { AuthService } from './auth.service';
import { RegisterDto, LoginDto, UpdateProfileDto, ChangePasswordDto } from './dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('register')
    async register(@Body() dto: RegisterDto) {
        return this.authService.register(dto);
    }

    @Post('login')
    async login(@Body() dto: LoginDto) {
        return this.authService.login(dto);
    }

    @Get('profile')
    @UseGuards(JwtAuthGuard)
    async getProfile(@Request() req: ExpressRequest & { user: any }) {
        return this.authService.getProfile(req.user.id);
    }

    @Put('profile')
    @UseGuards(JwtAuthGuard)
    async updateProfile(@Request() req: ExpressRequest & { user: any }, @Body() dto: UpdateProfileDto) {
        return this.authService.updateProfile(req.user.id, dto);
    }

    @Post('change-password')
    @UseGuards(JwtAuthGuard)
    async changePassword(@Request() req: ExpressRequest & { user: any }, @Body() dto: ChangePasswordDto) {
        return this.authService.changePassword(
            req.user.id,
            dto.oldPassword,
            dto.newPassword,
        );
    }
}
