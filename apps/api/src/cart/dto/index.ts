import { IsString, IsNumber, Min, IsOptional } from 'class-validator';

export class AddToCartDto {
    @IsString()
    productId: string;

    @IsNumber()
    @Min(1)
    @IsOptional()
    quantity?: number;
}

export class UpdateCartDto {
    @IsNumber()
    @Min(0)
    quantity: number;
}
