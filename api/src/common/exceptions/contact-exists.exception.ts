import { ConflictException } from '@nestjs/common';

export class ContactExistsException extends ConflictException {
    constructor(email: string) {
        super(`Contact with email ${email} already exists`);
    }
}

