import { PartialType } from '@nestjs/swagger';
import { CreateContactDto } from './contact.dto';

export class UpdateContactDto extends PartialType(CreateContactDto) {}
