import { ApiProperty } from "@nestjs/swagger";
import { Gender } from "src/common/enums/gender.enum";

export class ContactResponseDto {
    @ApiProperty({ example: 1 })
    id: number;

    @ApiProperty({ example: 'John Doe' })
    fullName: string;

    @ApiProperty({ example: 'john.doe@example.com' })
    email: string;

    @ApiProperty({ enum: Gender, example: Gender.MALE })
    gender: Gender;

    @ApiProperty({ example: '2024-01-02T12:00:00Z' })
    createdAt: Date;

    @ApiProperty({ example: '2024-01-02T12:00:00Z' })
    updatedAt: Date;
}