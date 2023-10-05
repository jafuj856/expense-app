import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { MongooseModule, Schema } from '@nestjs/mongoose';
import { cartSchema } from './schema/cart.schema';
import { PaymentService } from 'src/stripe/stripe.config';
import { productSchema } from 'src/products/schema/product.schema';
import {Payment} from './payment.serviece'
@Module({
  imports :[MongooseModule.forFeature([{name:'cart',schema:cartSchema}]),
  MongooseModule.forFeature([{name:'product', schema:productSchema}])
],
  controllers: [CartController],
  providers: [CartService,PaymentService,Payment],
})
export class CartModule {}
