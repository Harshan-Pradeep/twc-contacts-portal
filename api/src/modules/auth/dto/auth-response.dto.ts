import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
    @ApiProperty({
        example: 1,
        description: 'The unique identifier of the user'
    })
    id: number;

    @ApiProperty({
        example: 'john@example.com',
        description: 'The email address of the user'
    })
    email: string;

    @ApiProperty({
        example: '2024-01-02T12:00:00Z',
        description: 'The date when the user was created'
    })
    createdDate: Date;
}

export class AuthResponseDto {
    @ApiProperty({
        type: UserResponseDto,
        description: 'User information'
    })
    user: UserResponseDto;

    @ApiProperty({
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        description: 'JWT access token',
        required: false
    })
    access_token?: string;
}