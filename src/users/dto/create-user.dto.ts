import { IsString, IsNotEmpty, IsEmail } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    readonly name :string
    @IsEmail()
    readonly email:string;
     
    @IsNotEmpty()
    readonly password:string
}
