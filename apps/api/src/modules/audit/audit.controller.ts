import { Controller, Get, Query, UseGuards, Request } from '@nestjs/common';
import { AuditService } from './audit.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '@prisma/client';

@Controller('audit')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AuditController {
    constructor(private auditService: AuditService) { }

    @Get()
    @Roles(Role.ADMIN, Role.VENDOR)
    async getLogs(
        @Query('userId') userId?: string,
        @Query('entity') entity?: string,
        @Query('entityId') entityId?: string,
        @Query('action') action?: string,
        @Query('startDate') startDate?: string,
        @Query('endDate') endDate?: string,
        @Query('page') page?: number,
        @Query('limit') limit?: number,
    ) {
        return this.auditService.getLogs({
            userId,
            entity,
            entityId,
            action,
            startDate: startDate ? new Date(startDate) : undefined,
            endDate: endDate ? new Date(endDate) : undefined,
            page,
            limit,
        });
    }

    @Get('entity')
    @Roles(Role.ADMIN, Role.VENDOR)
    async getEntityHistory(
        @Query('entity') entity: string,
        @Query('entityId') entityId: string,
    ) {
        return this.auditService.getEntityHistory(entity, entityId);
    }

    @Get('my-activity')
    async getMyActivity(@Request() req, @Query('limit') limit?: number) {
        return this.auditService.getUserActivity(req.user.sub, limit);
    }
}
