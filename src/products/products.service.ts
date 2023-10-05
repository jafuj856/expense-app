import { Injectable,HttpStatus,Response,HttpCode } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import * as fs from 'fs';

@Injectable()
export class ProductsService {

  constructor(@InjectModel('Product') private readonly productModel :Model <CreateProductDto> ) {}

  create(createProductDto: CreateProductDto,file) {
    //console.log(file)
     const newData = new this.productModel(createProductDto)
     
     newData.image_url= file.filename
     newData.save()
    return {message:'new product successfully Added'};
  }


  async updateById(id:string,product:UpdateProductDto,file:any) {
     if(file){
    const image:any = await this.productModel.findById(new mongoose.Types.ObjectId(id))
    if(image){
      console.log(image.image_url)
      const imagePath = `./uploads/${image.image_url}`; // Replace with the actual file path
      console.log(imagePath+" image==========");
      
      if (fs.existsSync(`./uploads/${image.image_url}`)) {

        fs.unlink(imagePath, (err) => {
          if (err) {
            console.error('Error deleting file:', err);
            // Handle the error (e.g., return an error response)
          } else {
            console.log('File deleted successfully');
            // File deleted successfully
          }
        });
      } 
    }
  }   
    return await this.productModel.findByIdAndUpdate(id,product,{new:true});
  }


 async remove(id: string) {

    const image:any = await this.productModel.findById(new mongoose.Types.ObjectId(id))
       
       if(image){
    const imagePath = `./uploads/${image.image_url}`; // Replace with the actual file path
    console.log(imagePath);
    
    if (fs.existsSync(`./uploads/${image.image_url}`)) {
      console.log('image exist')
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error('Error deleting file:', err);
          // Handle the error (e.g., return an error response)
        } else {
          console.log('File deleted successfully');
          // File deleted successfully
        }
      });
    } 
    
    return this.productModel.findByIdAndDelete(new mongoose.Types.ObjectId(id));
  }
  return  {message:'this data not exist',status:HttpStatus.BAD_REQUEST}
}
}
