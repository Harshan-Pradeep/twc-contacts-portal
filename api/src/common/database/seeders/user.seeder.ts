import { DataSource } from 'typeorm';
import { User } from 'src/modules/auth/entities/user.entity';
import { PasswordUtil } from 'src/common/utils/password.util';

export class UserSeeder {
    constructor(private dataSource: DataSource) {}

    async seed(): Promise<void> {
        const userRepository = this.dataSource.getRepository(User);

        const DEMO_USER_EMAIL = process.env.DEMO_USER_EMAIL;
        const DEMO_USER_PASSWORD = process.env.DEMO_USER_PASSWORD;

        const existingUser = await userRepository.findOne({
            where: { email: DEMO_USER_EMAIL }
        });

        if (!existingUser) {
            const hashedPassword = await PasswordUtil.hash(DEMO_USER_EMAIL);
            
            const demoUser = userRepository.create({
                email: DEMO_USER_EMAIL,
                password: hashedPassword
            });

            await userRepository.save(demoUser);
            console.log('Demo user seeded successfully');
        }
    }
}