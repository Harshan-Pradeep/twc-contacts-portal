import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
    @ApiProperty({
        example: 'john@example.com',
        description: 'The email address of the user',
        format: 'email',
        required: true
    })
    @IsNotEmpty({ message: 'Email is required' })
    @IsEmail({}, { message: 'Please provide a valid email' })
    email: string;

    @ApiProperty({
        example: 'Password123!',
        description: 'The password for the user account',
        minLength: 8,
        required: true
    })
    @IsNotEmpty({ message: 'Password is required' })
    @IsString()
    password: string;
}