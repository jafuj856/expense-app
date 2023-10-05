import { Injectable } from '@nestjs/common';
const stripe = require('stripe')('sk_test_51NxngeSD7xImSfAUrmwLtsKlOfScMohYf1MPLasKdKu33qG2CW04SLztP13W2PDQ20UnYjvBd3Vf6DDVrYhkrwJF00dGQ1OoTL');

@Injectable()
export class PaymentService {
  async createPaymentLink(total) {

     

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'inr',
            unit_amount: total * 100,
            product_data: {
              name: 'Checkout for Ecommerce app by Adam Tech'
            }
          },
          quantity: 1
        }
      ],
      metadata: {
        userId: 'userid123'
      },
      mode: 'payment',
      success_url: 'https://yourwebsite.com/success',
      cancel_url: 'https://yourwebsite.com/cancel', 
    })
     
    return session.url;

    
  }

//   async successPayment(session_id:any){
//       const billingDetailse = await stripe.checkout.sessions.listLineItems(
//         session_id,
//         {limit:5}
        
//       );

//       const session = await stripe.checkout.sessions.retrieve(session_id)
//       return billingDetailse;
//   }

}

