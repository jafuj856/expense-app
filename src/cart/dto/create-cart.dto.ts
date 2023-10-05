import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateCartDto {

  @IsNotEmpty()
    item: string;
}



