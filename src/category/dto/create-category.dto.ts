import {IsOptional, IsNotEmpty} from 'class-validator'

export class CreateCategoryDto {

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
