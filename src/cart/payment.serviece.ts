import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCartDto } from './dto/create-cart.dto';
import { CreateProductDto } from 'src/products/dto/create-product.dto';
import { PaymentService } from 'src/stripe/stripe.config';

@Injectable()
export class Payment {
    constructor(@InjectModel('cart') private readonly cartModel:Model<CreateCartDto>,
    @InjectModel('product') private readonly productmodel:Model<CreateProductDto>,
    private readonly paymentService:PaymentService
    ){ }

async paymentServise(user){
     
    const cart:any = await this.cartModel.findOne({user:user}).populate('products.item')
    
      const price = cart.products.reduce((sum,cartitem)=> {
        return sum = sum+cartitem.item.price*cartitem.quantity},0)
 
    
return this.paymentService.createPaymentLink(price)
}
}