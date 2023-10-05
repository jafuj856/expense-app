import { Controller, Get, Post, Body, Patch, Param, Delete,UseGuards, UseInterceptors,UploadedFile } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Roles } from 'src/auth/roles/roles.decorator';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { RoleGuard } from 'src/auth/role/role.guard';
import { request } from 'http';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerConfig } from 'src/multer/multer';
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}


  //Add product
  @Roles('admin')
  @UseGuards(JwtAuthGuard,RoleGuard)
  @UseInterceptors(FileInterceptor('file', multerConfig))
  @Post('addproduct')
  create(@UploadedFile() file:any ,@Body() createProductDto: CreateProductDto) {
    
    return this.productsService.create(createProductDto,file);
  }

  //Update Product
  @Roles('admin')
  @UseGuards(JwtAuthGuard,RoleGuard)
  @UseInterceptors(FileInterceptor('file', multerConfig))
  @Post('update/:id')
  updateById(@UploadedFile() file:any,@Body()product:UpdateProductDto, @Param('id')id:string) {
    return this.productsService.updateById(id,product,file);
  }

 
//Delete Product

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}

