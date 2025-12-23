import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';

export interface AuditLogData {
    userId: string;
    action: string;
    entity: string;
    entityId: string;
    oldValue?: any;
    newValue?: any;
    ipAddress?: string;
    userAgent?: string;
}

@Injectable()
export class AuditService {
    constructor(private prisma: PrismaService) { }

    /**
     * Create audit log entry
     */
    async log(data: AuditLogData) {
        return this.prisma.auditLog.create({
            data: {
                userId: data.userId,
                action: data.action,
                entity: data.entity,
                entityId: data.entityId,
                oldValue: data.oldValue || null,
                newValue: data.newValue || null,
                ipAddress: data.ipAddress,
                userAgent: data.userAgent,
            },
        });
    }

    /**
     * Get audit logs with filters
     */
    async getLogs(filters: {
        userId?: string;
        entity?: string;
        entityId?: string;
        action?: string;
        startDate?: Date;
        endDate?: Date;
        page?: number;
        limit?: number;
    }) {
        const page = filters.page || 1;
        const limit = filters.limit || 50;
        const skip = (page - 1) * limit;

        const where: any = {};

        if (filters.userId) {
            where.userId = filters.userId;
        }

        if (filters.entity) {
            where.entity = filters.entity;
        }

        if (filters.entityId) {
            where.entityId = filters.entityId;
        }

        if (filters.action) {
            where.action = filters.action;
        }

        if (filters.startDate || filters.endDate) {
            where.createdAt = {};
            if (filters.startDate) {
                where.createdAt.gte = filters.startDate;
            }
            if (filters.endDate) {
                where.createdAt.lte = filters.endDate;
            }
        }

        const [logs, total] = await Promise.all([
            this.prisma.auditLog.findMany({
                where,
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
                include: {
                    user: {
                        select: {
                            id: true,
                            email: true,
                            firstName: true,
                            lastName: true,
                            role: true,
                        },
                    },
                },
            }),
            this.prisma.auditLog.count({ where }),
        ]);

        return {
            data: logs,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    }

    /**
     * Get audit logs for specific entity
     */
    async getEntityHistory(entity: string, entityId: string) {
        return this.prisma.auditLog.findMany({
            where: {
                entity,
                entityId,
            },
            orderBy: { createdAt: 'desc' },
            include: {
                user: {
                    select: {
                        id: true,
                        email: true,
                        firstName: true,
                        lastName: true,
                    },
                },
            },
        });
    }

    /**
     * Get user activity
     */
    async getUserActivity(userId: string, limit: number = 100) {
        return this.prisma.auditLog.findMany({
            where: { userId },
            take: limit,
            orderBy: { createdAt: 'desc' },
        });
    }
}
