import { Module } from '@nestjs/common';
import { ContactController } from './contact.controller';
import { ContactService } from './contact.service';
import { DatabaseModule } from 'src/common/database/database.module';
import { ContactRepository } from './repository/contact.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [ContactController],
  providers: [
    {
      provide: 'IContactRepository',
      useClass: ContactRepository,
    },
    ContactService],
    exports: ['IContactRepository']
})
export class ContactModule {}
