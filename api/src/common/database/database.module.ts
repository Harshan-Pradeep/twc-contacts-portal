import { Module } from '@nestjs/common';
import { databaseProviders } from 'src/config/database.config';
import { UserSeeder } from './seeders/user.seeder';

@Module({
    providers: [
        ...databaseProviders,
        UserSeeder
    ],
    exports: [...databaseProviders]
})
export class DatabaseModule {}
