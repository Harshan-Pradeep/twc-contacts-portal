import { Injectable, Inject, Logger } from '@nestjs/common';
import { UpdateContactDto } from './dto/update-contact.dto';
import { Contact } from './entities/contact.entity';
import { IContactRepository } from './repository/contact.respository.interface';
import { ContactExistsException } from 'src/common/exceptions/contact-exists.exception';
import { CreateContactDto } from './dto/contact.dto';
import { ContactNotFoundException } from 'src/common/exceptions/contact-not-found.exception';


@Injectable()
export class ContactService {
    private readonly logger = new Logger(ContactService.name);

    constructor(
        @Inject('IContactRepository')
        private readonly contactRepository: IContactRepository,
    ) {}

    async create(createContactDto: CreateContactDto, userId: number): Promise<Contact> {
        this.logger.log(`Creating contact for user ${userId}`);
        
        const existingContact = await this.contactRepository.findByEmail(
            createContactDto.email,
            userId
        );

        if (existingContact) {
            this.logger.warn(`Contact with email ${createContactDto.email} already exists for user ${userId}`);
            throw new ContactExistsException(createContactDto.email);
        }

        const contact = await this.contactRepository.create({
            ...createContactDto,
            userId
        });

        this.logger.log(`Created contact ${contact.id} for user ${userId}`);
        return contact;
    }

    async findAll(userId: number): Promise<Contact[]> {
        this.logger.log(`Retrieving all contacts for user ${userId}`);
        return await this.contactRepository.findByUserId(userId);
    }

    async findOne(id: number, userId: number): Promise<Contact> {
        this.logger.log(`Finding contact ${id} for user ${userId}`);
        
        const contact = await this.contactRepository.findById(id);

        if (!contact || contact.userId !== userId) {
            this.logger.warn(`Contact ${id} not found for user ${userId}`);
            throw new ContactNotFoundException(id);
        }

        return contact;
    }

    async update(
        id: number, 
        userId: number, 
        updateContactDto: UpdateContactDto
    ): Promise<Contact> {
        this.logger.log(`Updating contact ${id} for user ${userId}`);

        await this.findOne(id, userId);

        if (updateContactDto.email) {
            const existingContact = await this.contactRepository.findByEmail(
                updateContactDto.email,
                userId
            );

            if (existingContact && existingContact.id !== id) {
                this.logger.warn(
                    `Cannot update contact ${id}: email ${updateContactDto.email} already exists`
                );
                throw new ContactExistsException(updateContactDto.email);
            }
        }

        const updatedContact = await this.contactRepository.update(id, {
            ...updateContactDto,
            userId
        });

        this.logger.log(`Updated contact ${id} for user ${userId}`);
        return updatedContact;
    }

    async remove(id: number, userId: number): Promise<void> {
        this.logger.log(`Removing contact ${id} for user ${userId}`);
        
        await this.findOne(id, userId);
        
        await this.contactRepository.delete(id);
        this.logger.log(`Removed contact ${id}`);
    }
}