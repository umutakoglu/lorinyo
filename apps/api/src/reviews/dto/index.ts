import { IsString, IsNumber, Min, Max, IsOptional } from 'class-validator';

export class CreateReviewDto {
    @IsString()
    productId: string;

    @IsNumber()
    @Min(1)
    @Max(5)
    rating: number;

    @IsString()
    @IsOptional()
    title?: string;

    @IsString()
    @IsOptional()
    comment?: string;
}
