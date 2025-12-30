import { Controller, Get, Put, Body, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { PrismaService } from '../prisma/prisma.service';

@Controller('settings')
@UseGuards(JwtAuthGuard, RolesGuard)
export class SettingsController {
    constructor(private prisma: PrismaService) { }

    /**
     * Get all settings (Admin only)
     */
    @Get()
    @Roles('ADMIN' as any)
    async getSettings() {
        // Return default settings structure
        return {
            general: {
                siteName: 'Lorinyo',
                siteDescription: 'Online Alışveriş Sitesi',
                contactEmail: 'info@lorinyo.com',
                contactPhone: '+90 555 123 4567',
                address: 'İstanbul, Türkiye',
                currency: 'TRY',
                language: 'tr'
            },
            payment: {
                iyzico: {
                    enabled: true,
                    testMode: true
                },
                bankTransfer: {
                    enabled: true,
                    bankName: 'Garanti Bankası',
                    iban: 'TR00 0000 0000 0000 0000 0000 00'
                },
                cashOnDelivery: {
                    enabled: true,
                    extraFee: 10
                }
            },
            shipping: {
                freeShippingThreshold: 200,
                defaultShippingCost: 29.90,
                providers: [
                    { name: 'Yurtiçi Kargo', code: 'yurtici', enabled: true },
                    { name: 'Aras Kargo', code: 'aras', enabled: true },
                    { name: 'MNG Kargo', code: 'mng', enabled: false }
                ]
            },
            email: {
                smtpHost: 'smtp.example.com',
                smtpPort: 587,
                smtpUser: 'noreply@lorinyo.com',
                fromName: 'Lorinyo',
                fromEmail: 'noreply@lorinyo.com',
                templates: {
                    orderConfirmation: true,
                    shippingNotification: true,
                    passwordReset: true
                }
            },
            theme: {
                primaryColor: '#3B82F6',
                secondaryColor: '#10B981',
                darkMode: true,
                logo: '/images/logo.png',
                favicon: '/favicon.ico'
            }
        };
    }

    /**
     * Update general settings (Admin only)
     */
    @Put('general')
    @Roles('ADMIN' as any)
    async updateGeneralSettings(@Body() data: any) {
        // In production, save to database
        return { message: 'Genel ayarlar güncellendi', data };
    }

    /**
     * Update payment settings (Admin/Vendor)
     */
    @Put('payment')
    @Roles('ADMIN' as any, 'VENDOR' as any)
    async updatePaymentSettings(@Body() data: any) {
        return { message: 'Ödeme ayarları güncellendi', data };
    }

    /**
     * Update shipping settings (Admin/Vendor)
     */
    @Put('shipping')
    @Roles('ADMIN' as any, 'VENDOR' as any)
    async updateShippingSettings(@Body() data: any) {
        return { message: 'Kargo ayarları güncellendi', data };
    }

    /**
     * Update email settings (Admin only)
     */
    @Put('email')
    @Roles('ADMIN' as any)
    async updateEmailSettings(@Body() data: any) {
        return { message: 'E-posta ayarları güncellendi', data };
    }

    /**
     * Update theme settings (Admin/Vendor)
     */
    @Put('theme')
    @Roles('ADMIN' as any, 'VENDOR' as any)
    async updateThemeSettings(@Body() data: any) {
        return { message: 'Tema ayarları güncellendi', data };
    }
}
