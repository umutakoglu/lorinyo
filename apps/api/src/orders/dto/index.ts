import { IsString, IsEnum, IsOptional } from 'class-validator';

export class CreateOrderDto {
    @IsString()
    addressId: string;

    @IsEnum(['CREDIT_CARD', 'BANK_TRANSFER', 'CASH_ON_DELIVERY'])
    paymentMethod: 'CREDIT_CARD' | 'BANK_TRANSFER' | 'CASH_ON_DELIVERY';

    @IsString()
    @IsOptional()
    notes?: string;
}

export class UpdateOrderStatusDto {
    @IsEnum(['PENDING', 'CONFIRMED', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED', 'RETURNED'])
    status: string;
}
