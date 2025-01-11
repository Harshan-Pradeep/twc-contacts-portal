import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterDto {
    @ApiProperty({
        example: 'john@example.com',
        description: 'The email address for the new account',
        format: 'email',
        uniqueItems: true,
        required: true
    })
    @IsNotEmpty({ message: 'Email is required' })
    @IsEmail({}, { message: 'Please provide a valid email' })
    email: string;

    @ApiProperty({
        example: 'Password123!',
        description: 'The password for the new account. Must be at least 8 characters long.',
        minLength: 8,
        required: true
    })
    @IsNotEmpty({ message: 'Password is required' })
    @IsString()
    @MinLength(8, { message: 'Password must be at least 8 characters long' })
    password: string;
}