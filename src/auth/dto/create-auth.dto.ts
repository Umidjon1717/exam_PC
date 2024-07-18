import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';
import { UserRoles } from '../enums/user.role';

export class CreateAuthDto {
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

