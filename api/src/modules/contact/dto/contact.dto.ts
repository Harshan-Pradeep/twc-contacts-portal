import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Gender } from 'src/common/enums/gender.enum';

export class ContactDto {
    @IsNotEmpty({ message: 'Full name is required' })
    @IsString()
    fullName: string;

    @IsNotEmpty({ message: 'Email is required' })
    @IsEmail({}, { message: 'Please provide a valid email' })
    email: string;

    @IsNotEmpty({ message: 'Gender is required' })
    @IsEnum(Gender, { message: 'Gender must be either Male or Female' })
    gender: Gender;
}