import { Controller, Get, Post, Body, Patch, Param, Delete,HttpCode, UseGuards, Req, Res, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './jwt/jwt.guard';
import { Roles } from './roles/roles.decorator';
import { RoleGuard } from './role/role.guard';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}


  @Post('/sigin-up')
  create(@Body() createAuthDto: CreateAuthDto) {
    
    return this.authService.create(createAuthDto);
  }
  
  @Post('login')
  login(@Body()loginDto:LoginDto){
    return this.authService.login(loginDto)
  }

}
