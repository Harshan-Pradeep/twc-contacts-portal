import { Contact } from "../entities/contact.entity";


export interface IContactRepository {
    create(contact: Partial<Contact>): Promise<Contact>;
    findById(id: number): Promise<Contact | null>;
    findByUserId(userId: number): Promise<Contact[]>;
    update(id: number, contact: Partial<Contact>): Promise<Contact>;
    delete(id: number): Promise<void>;
    findByEmail(email: string, userId: number): Promise<Contact | null>;
}