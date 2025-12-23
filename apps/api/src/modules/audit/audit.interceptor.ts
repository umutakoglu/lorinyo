import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuditService } from './audit.service';

/**
 * Interceptor to automatically log actions
 * Usage: @UseInterceptors(AuditInterceptor)
 * 
 * Note: This is a basic implementation. For production, you may want to:
 * - Add custom decorators to specify entity details
 * - Capture request body for oldValue/newValue
 * - Handle async operations better
 */
@Injectable()
export class AuditInterceptor implements NestInterceptor {
    constructor(private auditService: AuditService) { }

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const request = context.switchToHttp().getRequest();
        const user = request.user;

        // Only log if user is authenticated
        if (!user) {
            return next.handle();
        }

        const action = `${request.method}_${request.route?.path || request.url}`;
        const ipAddress = request.ip || request.connection.remoteAddress;
        const userAgent = request.headers['user-agent'];

        return next.handle().pipe(
            tap(() => {
                // Log after successful execution
                // In production, you'd extract entity details from the response or request
                this.auditService.log({
                    userId: user.sub,
                    action,
                    entity: 'Unknown', // Should be determined from context
                    entityId: 'Unknown', // Should be determined from context
                    ipAddress,
                    userAgent,
                }).catch((error) => {
                    console.error('Failed to create audit log:', error);
                });
            }),
        );
    }
}
