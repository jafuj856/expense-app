import { Injectable,HttpException,HttpStatus } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Model } from 'mongoose';
import {InjectModel} from '@nestjs/mongoose'
import { LoginDto } from 'src/auth/dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import * as jwt  from 'jsonwebtoken';
const bcrypt = require('bcryptjs')
@Injectable()
export class UsersService {
  constructor(private jwtService:JwtService,@InjectModel('User') private readonly userModel:Model<CreateUserDto>) {}
  
  async create(newData: CreateUserDto) {
        const existuser:any = await this.userModel.findOne({email: newData.email})
        

        if(existuser){
          throw new HttpException('Email is Exist please login', HttpStatus.BAD_REQUEST)
       
        }
        const newItem = new this.userModel(newData)
        await newItem.save()
   return {message:'successfully created'} ;
  }

  async login(loginData:LoginDto){
    const existuser:any = await this.userModel.findOne({email:loginData.email})
   
      if(existuser){
        console.log(existuser)
        const password = await bcrypt.compare(loginData.password,existuser.password)
        
        if(password){
           console.log(existuser.roles)
          const payLoad ={id:existuser._id,roles:existuser.roles}
         const token=jwt.sign(payLoad,'secret')
        return {token}
       }
        
      }
    
     throw new HttpException('not fond',HttpStatus.NOT_FOUND)
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
