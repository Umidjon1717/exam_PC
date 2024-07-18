import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { IsOptional, IsNotEmpty, IsString, IsNumber, IsEnum } from 'class-validator';
import { ProductCurrency } from '../enum/product.enum';

export class UpdateProductDto extends PartialType(CreateProductDto) {
    @IsOptional()
    id?: string;
  
    @IsNotEmpty()
    @IsString()
    name: string;
  
    @IsNotEmpty()
    @IsString()
    description: string;
  
    @IsNotEmpty()
    @IsString()
    categoryId: string;
  
    @IsNotEmpty()
    @IsNumber()
    price: number;
  
    @IsEnum(ProductCurrency)
    @IsOptional()
    currency?: ProductCurrency;
  
    @IsNotEmpty()
    features: Record<string, any>;
}
