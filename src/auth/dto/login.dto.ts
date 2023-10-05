import { IsEmail,IsNotEmpty } from "class-validator";

export class LoginDto {

      @IsEmail()
    readonly email:string;
      @IsNotEmpty()
       password:string;

      readonly role:string;
}