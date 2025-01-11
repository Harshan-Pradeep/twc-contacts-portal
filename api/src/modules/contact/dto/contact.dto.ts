import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';
import { Gender } from 'src/common/enums/gender.enum';

export class CreateContactDto {
    @ApiProperty({
        example: 'John Doe',
        description: 'Full name of the contact',
        minLength: 2
    })
    @IsNotEmpty({ message: 'Full name is required' })
    @IsString({ message: 'Full name must be a string' })
    @MinLength(2, { message: 'Full name must be at least 2 characters long' })
    fullName: string;

    @ApiProperty({
        example: 'john.doe@example.com',
        description: 'Email address of the contact'
    })
    @IsNotEmpty({ message: 'Email is required' })
    @IsEmail({}, { message: 'Please provide a valid email' })
    email: string;

    @ApiProperty({
        example: '+1234567890',
        description: 'Phone number of the contact',
        minLength: 10,
        maxLength: 15
    })
    @IsNotEmpty({ message: 'Phone number is required' })
    @IsString({ message: 'Phone number must be a string' })
    @Matches(/^\+?[0-9]{10,15}$/, { message: 'Phone number must be a valid international format' })
    phoneNumber: string;
    
    @ApiProperty({
        enum: Gender,
        example: Gender.MALE,
        description: 'Gender of the contact'
    })
    @IsNotEmpty({ message: 'Gender is required' })
    @IsEnum(Gender, { message: 'Gender must be either Male or Female' })
    gender: Gender;
}
