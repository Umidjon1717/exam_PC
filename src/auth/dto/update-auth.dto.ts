import { PartialType } from '@nestjs/mapped-types';
import { CreateAuthDto } from './create-auth.dto';
import { UserRoles } from '../enums/user.role';
import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateAuthDto extends PartialType(CreateAuthDto) {
    @IsOptional()
    id?: string;
  
    @IsEmail()
    email: string;
  
    @IsNotEmpty()
    username: string;
  
    @IsNotEmpty()
    password: string;
  
    @IsNotEmpty()
    role: UserRoles;
  
    @IsOptional()
    created_at?: Date;
  
    @IsOptional()
    updated_at?: Date;
}
