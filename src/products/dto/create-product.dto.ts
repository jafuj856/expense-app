import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    name : string;
    
    @IsString()
    @IsNotEmpty()
    description:string;

    @IsNumber()
    @IsNotEmpty()
    price:number;
    
    image_url:string
}
