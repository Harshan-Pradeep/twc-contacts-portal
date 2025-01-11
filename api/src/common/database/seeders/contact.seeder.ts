import { Gender } from "src/common/enums/gender.enum";
import { User } from "src/modules/auth/entities/user.entity";
import { Contact } from "src/modules/contact/entities/contact.entity";
import { DataSource } from "typeorm";

export class ContactSeeder {
    constructor(private dataSource: DataSource) { }

    async seed(): Promise<void> {
        const userRepository = this.dataSource.getRepository(User);
        const contactRepository = this.dataSource.getRepository(Contact);

        const adminUser = await userRepository.findOne({
            where: { email: 'admin@admin.com' }
        });

        if (!adminUser) {
            console.log('Admin user not found, skipping contact seeding');
            return;
        }

        const existingContacts = await contactRepository.find({
            where: { userId: adminUser.id }
        });

        if (existingContacts.length > 0) {
            console.log('Demo contacts already exist');
            return;
        }

        const contacts = [
            {
                fullName: 'John Smith',
                email: 'john.smith@example.com',
                phoneNumber: '+1-555-123-4567',
                gender: Gender.MALE,
                userId: adminUser.id
            },
            {
                fullName: 'Sarah Johnson',
                email: 'sarah.j@example.com',
                phoneNumber: '+1-555-234-5678',
                gender: Gender.FEMALE,
                userId: adminUser.id
            },
            {
                fullName: 'Michael Chen',
                email: 'michael.chen@example.com',
                phoneNumber: '+1-555-345-6789',
                gender: Gender.MALE,
                userId: adminUser.id
            }
        ];

        for (const contactData of contacts) {
            const contact = contactRepository.create(contactData);
            await contactRepository.save(contact);
        }

        console.log('Demo contacts seeded successfully');
    }
}
