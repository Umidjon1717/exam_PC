import { IsString, IsNotEmpty, IsOptional } from "class-validator";
export class CreateComparisonDto {
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
