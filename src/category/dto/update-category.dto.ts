import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryDto } from './create-category.dto';
import { IsOptional, IsNotEmpty } from 'class-validator';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
    @IsOptional()
    id?:string;

    @IsNotEmpty()
    name:string

    @IsNotEmpty()
    description:string

    @IsOptional()
    created_at?: Date;
  
    @IsOptional()
    updated_at?: Date;
}
