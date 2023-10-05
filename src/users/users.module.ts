import { Module } from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose'
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { user_schema } from './schemas/user.schema';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: 'secretKey',
      signOptions: { expiresIn: '60s' },
    }),
    MongooseModule.forFeature([{name : 'User', schema :user_schema}])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
