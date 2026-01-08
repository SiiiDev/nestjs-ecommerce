import { Type } from "class-transformer";
import { IsNumber, IsOptional, isString, IsString, IsUUID, Min, MinLength } from "class-validator";

export class CreateBookDto {
    @IsString()
    @MinLength(5)
    title: string;

    @IsString()
    @IsOptional()
    description: string;

    @Type(() => Number)
    @IsNumber()
    @Min(0)
    stock: number;

    @Type(() => Number)
    @IsNumber()
    @Min(0)
    price: number;

    @IsOptional()
    @IsString()
    cover?: string;

    @IsOptional()
    @IsUUID()
    categoryId? : string;



}
