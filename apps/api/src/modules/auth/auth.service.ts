import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../common/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { Role } from '@prisma/client';

export interface JwtPayload {
    sub: string;
    email: string;
    role: Role;
}

export interface AuthResponse {
    accessToken: string;
    user: {
        id: string;
        email: string;
        firstName?: string;
        lastName?: string;
        role: Role;
    };
}

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
    ) { }

    async register(
        email: string,
        password: string,
        firstName?: string,
        lastName?: string,
        role: Role = Role.CUSTOMER,
    ): Promise<AuthResponse> {
        // Check if user already exists
        const existingUser = await this.prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            throw new ConflictException('Email already registered');
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = await this.prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                firstName,
                lastName,
                role,
            },
        });

        // Generate token
        const accessToken = this.generateToken(user.id, user.email, user.role);

        return {
            accessToken,
            user: {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role,
            },
        };
    }

    async login(email: string, password: string): Promise<AuthResponse> {
        const user = await this.validateUser(email, password);

        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const accessToken = this.generateToken(user.id, user.email, user.role);

        return {
            accessToken,
            user: {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role,
            },
        };
    }

    async validateUser(email: string, password: string) {
        const user = await this.prisma.user.findUnique({
            where: { email },
        });

        if (!user || !user.isActive) {
            return null;
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return null;
        }

        return user;
    }

    async getUserById(id: string) {
        const user = await this.prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                role: true,
                isActive: true,
                createdAt: true,
            },
        });

        if (!user) {
            throw new UnauthorizedException('User not found');
        }

        return user;
    }

    private generateToken(userId: string, email: string, role: Role): string {
        const payload: JwtPayload = {
            sub: userId,
            email,
            role,
        };

        return this.jwtService.sign(payload);
    }

    async verifyToken(token: string): Promise<JwtPayload> {
        try {
            return this.jwtService.verify<JwtPayload>(token);
        } catch (error) {
            throw new UnauthorizedException('Invalid token');
        }
    }
}
