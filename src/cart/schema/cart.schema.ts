import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaType, SchemaTypes, Types } from 'mongoose';
import { Product } from 'src/products/schema/product.schema';
import { User } from 'src/users/schemas/user.schema';

@Schema({
  timestamps: true,
})
export class Cart extends Document {
  @Prop({type: SchemaTypes.ObjectId, ref: User.name})
  user: Types.ObjectId;

  @Prop([
    {
      item: { type: SchemaTypes.ObjectId, ref: "Product"},
      quantity: Number,
    },
  ])
  products: {
    item: Types.ObjectId;
    quantity: number;
  }[];
}

export const cartSchema = SchemaFactory.createForClass(Cart);
