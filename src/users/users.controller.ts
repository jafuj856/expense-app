import { Controller, Get, Post, Body, Patch, Param, Delete,Req, UseGuards,Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { HttpStatus } from '@nestjs/common/enums';
import { Roles } from 'src/auth/roles/roles.decorator';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { RoleGuard } from 'src/auth/role/role.guard';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Roles('admin')
  @UseGuards(JwtAuthGuard,RoleGuard)
  @Get()
  profile(@Req() req,@Res() res) {
    
    return res.status(HttpStatus.OK).json(req.user);
  }

}
