import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { Roles } from './decorator/roles.decorator';
import { UserRoles } from './enums/user.role';
import { AuthGuard, RoleGuard } from './middleware/auth.mid';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  signIn(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.signIn(createAuthDto);
  }

  @Post('signup')
  signUp(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.signUp(createAuthDto);
  }

  @Roles(UserRoles.ADMIN)
  @UseGuards(AuthGuard, RoleGuard)  
  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @Roles(UserRoles.ADMIN)
  @UseGuards(AuthGuard, RoleGuard) 
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(id);
  }

  @Roles(UserRoles.ADMIN)
  @UseGuards(AuthGuard, RoleGuard) 
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(id, updateAuthDto);
  }

  @Roles(UserRoles.ADMIN)
  @UseGuards(AuthGuard, RoleGuard) 
  @Delete('logout/:id')
  logout(@Param('id') id: string) {
    this.authService.logout(id)
    return ` user logged out`;
  }
}
