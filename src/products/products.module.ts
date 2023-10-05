import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { productSchema } from './schema/product.schema';

@Module({
  imports : [MongooseModule.forFeature([{name:'Product',schema:productSchema}])],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
