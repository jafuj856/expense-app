import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './auth/jwt.strategy';
import { ProductsModule } from './products/products.module';
import { CartModule } from './cart/cart.module';




@Module({
  imports: [
    PassportModule,
    JwtModule.register({secret:'secrete',signOptions:{expiresIn:'1h'}}),
    MongooseModule.forRoot('mongodb+srv://jafuj856:jpcp1234@cluster0.c57ci1c.mongodb.net/nestdb'),
  UsersModule,
  ConfigModule.forRoot({
    isGlobal: true, 
    envFilePath: '.env' 
  }),
  AuthModule,
  ProductsModule,
  CartModule,

],
  controllers: [AppController],
  providers: [AppService,JwtStrategy],
})
export class AppModule {}
