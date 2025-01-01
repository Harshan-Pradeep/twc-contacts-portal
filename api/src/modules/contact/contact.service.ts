import { Injectable, Inject, NotFoundException, ConflictException } from '@nestjs/common';
import { IContactRepository } from './repository/contact.respository.interface';
import { ContactDto } from './dto/contact.dto';
import { Contact } from './entities/contact.entity';



@Injectable()
export class ContactService {
    constructor(
        @Inject('IContactRepository')
        private readonly contactRepository: IContactRepository,
    ) {}

    async create(contactDto: ContactDto, userId: number): Promise<Contact> {
        // Check if email already exists for this user
        const existingContact = await this.contactRepository.findByEmail(
            contactDto.email,
            userId
        );

        if (existingContact) {
            throw new ConflictException('Contact with this email already exists');
        }

        return await this.contactRepository.create({
            ...contactDto,
            userId
        });
    }

    async findAll(userId: number): Promise<Contact[]> {
        return await this.contactRepository.findByUserId(userId);
    }

    async findOne(id: number, userId: number): Promise<Contact> {
        const contact = await this.contactRepository.findById(id);

        if (!contact || contact.userId !== userId) {
            throw new NotFoundException('Contact not found');
        }

        return contact;
    }

    async update(id: number, userId: number, contactDto: ContactDto): Promise<Contact> {
        // Check if contact exists and belongs to user
        await this.findOne(id, userId);

        // If email is being updated, check for duplicates
        if (contactDto.email) {
            const existingContact = await this.contactRepository.findByEmail(
                contactDto.email,
                userId
            );

            if (existingContact && existingContact.id !== id) {
                throw new ConflictException('Contact with this email already exists');
            }
        }

        return await this.contactRepository.update(id, {
            ...contactDto,
            userId
        });
    }

    async remove(id: number, userId: number): Promise<void> {
        // Check if contact exists and belongs to user
        await this.findOne(id, userId);
        await this.contactRepository.delete(id);
    }
}