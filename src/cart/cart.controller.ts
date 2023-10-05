import { Controller, Get, Post, Body, Patch, Param, Delete,UseGuards,Request,Res } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { Payment } from './payment.serviece';
import { PaymentService } from 'src/stripe/stripe.config';
import { Roles } from 'src/auth/roles/roles.decorator';
import { session } from 'passport';


@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService, private readonly paymentService:PaymentService,
    private readonly paymentservi:Payment
    ) {}
  @Roles('user')
  @UseGuards(JwtAuthGuard)
  @Post('addcart')
  create(@Body() products:any, @Request()req) {
    console.log(products)
    const user = req.user.userId
    return this.cartService.create(products,user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('viewcart')
  findAll(@Request()req) {
    const user:any = req.user.userId
    return this.cartService.findAll(user);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.cartService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto) {
  //   return this.cartService.update(+id, updateCartDto);
  // }
  @UseGuards(JwtAuthGuard)
  @Delete('delete/:id')
  remove(@Request()req,@Param('id') id: any) {
    
   const user:any= req.user.userId
    return this.cartService.remove(id,user);
  }
@UseGuards(JwtAuthGuard)
@Get('payment')
payment(@Request() req){
 const user = req.user.userId
 console.log(user)
 return this.paymentservi.paymentServise(user)
  // return this.paymentService.createPaymentLink(total)

}
   
@Get('paymentdetailse')
paymentDetailse(@Res({passthrough:true}) res){
 const user:string = res.req.query.session_id
 console.log(user)

   return this.paymentService.successPayment(user)

}
     
  }




