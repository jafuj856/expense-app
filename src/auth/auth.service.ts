import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginDto } from './dto/login.dto';
import { UsersService } from 'src/users/users.service';
const bcrypt = require('bcryptjs')
@Injectable()
export class AuthService {
  constructor(private readonly userService :UsersService){}

   async create(createAuthDto: CreateAuthDto) {
    createAuthDto.password = await bcrypt.hash(createAuthDto.password,10)
  
    return this.userService.create(createAuthDto);
  }

  login(loginDto:LoginDto) {

    return this.userService.login(loginDto);
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  
}
