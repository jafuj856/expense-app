import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
    timestamps:true
})
export class Product {

    @Prop()
    name :string;

    @Prop()
    description:string;

    @Prop()
    price:Number;

    @Prop()
    image_url:string

}

export const productSchema = SchemaFactory.createForClass(Product)