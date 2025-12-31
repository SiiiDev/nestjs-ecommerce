import { isDecimal, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, Min, MinLength } from "class-validator";

export class CreateProductDto {
    @IsString()
    @MinLength(5)
    title: string

    @IsString()
    description: string;

    @IsNumber()
    @Min(0)
    price: number;

    @IsNumber()
    @Min(0)
    stock: number;

    @IsString()
    image: string

    @IsUUID()
    @IsOptional()
    categoryId? : string;
}