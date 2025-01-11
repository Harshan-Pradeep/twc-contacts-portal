import { NotFoundException } from '@nestjs/common';

export class ContactNotFoundException extends NotFoundException {
    constructor(id: number) {
        super(`Contact with ID ${id} not found`);
    }
}