import { PartialType } from '@nestjs/mapped-types';
import { CreateComparisonDto } from './create-comparison.dto';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateComparisonDto extends PartialType(CreateComparisonDto) {
    @IsOptional()
    id?:string

    @IsNotEmpty()
    @IsString()
    name:string

    @IsNotEmpty()
    @IsString()
    products:string

    @IsOptional()
    created_at?: Date;
  
    @IsOptional()
    updated_at?: Date;
}
