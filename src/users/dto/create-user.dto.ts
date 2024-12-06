import { IsDateString, IsEmail, IsNotEmpty } from "class-validator";

export class CreateUserDto {

    @IsNotEmpty({ message: 'Name không được để trống', })
    name: string;

    @IsEmail({}, { message: 'Email không đúng định dạng', })
    @IsNotEmpty({ message: 'Email không được để trống', })
    email: string;

    @IsNotEmpty({ message: 'Password không được để trống', })
    password: string;

    @IsNotEmpty({ message: 'birthDate không được để trống', })
    birthDate: Date;

    @IsNotEmpty({ message: 'phone không được để trống', })
    phone: number;

    @IsNotEmpty({ message: 'Address không được để trống', })
    address: string;

}  

export class RegisterUserDto {

    @IsNotEmpty({ message: 'Name không được để trống', })
    name: string;

    @IsEmail({}, { message: 'Email không đúng định dạng', })
    @IsNotEmpty({ message: 'Email không được để trống', })
    email: string;

    @IsNotEmpty({ message: 'Password không được để trống', })
    password: string;

    @IsNotEmpty({ message: 'birthDate không được để trống', })
    @IsDateString()
    birthDate: Date;

    @IsNotEmpty({ message: 'phone không được để trống', })
    phone: number;

    @IsNotEmpty({ message: 'Address không được để trống', })
    address: string;
}
