import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { IContactRepository } from './contact.respository.interface';
import { Contact } from '../entities/contact.entity';


@Injectable()
export class ContactRepository implements IContactRepository {
    private repository: Repository<Contact>;

    constructor(
        @Inject('DATA_SOURCE')
        private dataSource: DataSource,
    ) {
        this.repository = this.dataSource.getRepository(Contact);
    }

    async create(contact: Partial<Contact>): Promise<Contact> {
        const newContact = this.repository.create(contact);
        return await this.repository.save(newContact);
    }

    async findById(id: number): Promise<Contact | null> {
        return await this.repository.findOne({ 
            where: { id }
        });
    }

    async findByUserId(userId: number): Promise<Contact[]> {
        return await this.repository.find({
            where: { userId }
        });
    }

    async update(id: number, contactData: Partial<Contact>): Promise<Contact> {
        const contact = await this.findById(id);
        if (!contact) {
            throw new NotFoundException('Contact not found');
        }

        Object.assign(contact, contactData);
        return await this.repository.save(contact);
    }

    async delete(id: number): Promise<void> {
        const result = await this.repository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException('Contact not found');
        }
    }

    async findByEmail(email: string, userId: number): Promise<Contact | null> {
        return await this.repository.findOne({
            where: { 
                email,
                userId 
            }
        });
    }
}