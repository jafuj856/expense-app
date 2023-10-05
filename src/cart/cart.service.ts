import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Product } from 'src/products/schema/product.schema';
import { CreateProductDto } from 'src/products/dto/create-product.dto';
import { PaymentService } from 'src/stripe/stripe.config';

@Injectable()
export class CartService {
  constructor(@InjectModel('cart') private readonly cartModel:Model<CreateCartDto>,
  @InjectModel('product') private readonly productmodel:Model<CreateProductDto>,
  private readonly paymentService:PaymentService
  ){ }
 async create(products: any,user:any) {
//   console.log(products.item+'++++++++++')
//   const price:any = await this.productmodel.findById(new mongoose.Types.ObjectId(products.item))
//   console.log(price);
//  // const product = price.products.find((product)=>console.log(product))
   
   const cart:any =await this.cartModel.findOne({user:user})
   if(cart){
    
    const updateproduct = cart.products.find((product)=>product.item.toString()===products.item)
     console.log(updateproduct)
     if(updateproduct){
      updateproduct.quantity+=1
     return cart.save()
     } 
     else{
      cart.products.push({item:new mongoose.Types.ObjectId(products.item),quantity:1})
      return cart.save()
     }
     
 }

console.log(products.item)
const additem = {item:new mongoose.Types.ObjectId(products.item),quantity:1}
console.log(additem)
 const newCart =new this.cartModel({
  user:user,
products: additem})
return newCart.save();

}

//cart products view
   async findAll(user) {
        const cart:any = await this.cartModel.findOne({user:user}).populate('products.item')
        // console.log(cart.products)
          const price = cart.products.reduce((sum,cartitem)=> {
            return sum = sum+cartitem.item.price*cartitem.quantity},0)
      console.log(price);
    return {cart,totalprice:price};
  }

  findOne(id: number) {
    return `This action returns a #${id} cart`;
  }

  update(id: number, updateCartDto: UpdateCartDto) {
    return `This action updates a #${id} cart`;
  }

  async remove(id: any,user) {
    console.log(id)
    const cart:any =await this.cartModel.findOne({user:user})
    if(cart){
      //console.log(cart)
      const product = cart.products.find((product)=>product.item.toString()===id)
      if(product){
        console.log(product.quantity)
        if(product.quantity!=1){
              product.quantity-=1
              return cart.save()
        }
        else{
          return{status:HttpStatus.BAD_REQUEST ,message:'unable to decrement product'}
        }
      }
    }
    return `This action removes a #${id} cart`;
  }
}
