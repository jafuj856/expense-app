import { IsEmail,IsNotEmpty,IsString } from "class-validator";

export class CreateAuthDto {
      @IsNotEmpty()
      @IsString()
    readonly name:string;
      @IsEmail()
    readonly email:string;
      @IsNotEmpty()
       password:string
}
