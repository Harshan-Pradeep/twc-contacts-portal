import { 
    Controller, 
    Get, 
    Post, 
    Body, 
    Put, 
    Param, 
    Delete, 
    UseGuards,
    Request,
    HttpCode,
    HttpStatus,
    ParseIntPipe,
    UseFilters,
    UseInterceptors,
} from '@nestjs/common';
import { 
    ApiTags, 
    ApiOperation, 
    ApiResponse, 
    ApiBearerAuth,
    ApiParam,
    ApiBody,
    ApiOkResponse,
    ApiNotFoundResponse,
    ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ContactService } from './contact.service';
import { LoggingInterceptor } from '../../common/interceptors/logging.interceptor';
import { ResponseInterceptor } from '../../common/interceptors/response.interceptor';
import { CustomValidationPipe } from '../../common/pipes/validation.pipe';
import { ContactExceptionFilter } from 'src/common/filters/contact-exception.filter';
import { CreateContactDto } from './dto/contact.dto';
import { ContactResponseDto } from './dto/contact-response.dto';
import { UpdateContactDto } from './dto/update-contact.dto';

@ApiTags('Contacts')
@Controller('contacts')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@UseFilters(ContactExceptionFilter)
@UseInterceptors(LoggingInterceptor, ResponseInterceptor)
export class ContactController {
    constructor(private readonly contactService: ContactService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Create a new contact', description: 'Creates a new contact for the authenticated user' })
    @ApiBody({ type: CreateContactDto })
    @ApiResponse({ 
        status: HttpStatus.CREATED, 
        description: 'Contact created successfully',
        type: ContactResponseDto 
    })
    @ApiResponse({ 
        status: HttpStatus.CONFLICT, 
        description: 'Contact with this email already exists' 
    })
    @ApiUnauthorizedResponse({ description: 'User is not authenticated' })
    async create(
        @Body(new CustomValidationPipe()) createContactDto: CreateContactDto,
        @Request() req
    ) {
        return await this.contactService.create(createContactDto, req.user.id);
    }


    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ 
        summary: 'Get all contacts', 
        description: 'Retrieves all contacts for the authenticated user' 
    })
    @ApiOkResponse({ 
        description: 'Retrieved all contacts successfully',
        type: [ContactResponseDto]
    })
    @ApiUnauthorizedResponse({ description: 'User is not authenticated' })
    async findAll(@Request() req) {
        return await this.contactService.findAll(req.user.id);
    }


    @Get(':id')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ 
        summary: 'Get contact by ID', 
        description: 'Retrieves a specific contact by ID' 
    })
    @ApiParam({ 
        name: 'id', 
        description: 'The ID of the contact to retrieve',
        type: Number 
    })
    @ApiOkResponse({ 
        description: 'Retrieved contact successfully',
        type: ContactResponseDto
    })
    @ApiNotFoundResponse({ description: 'Contact not found' })
    @ApiUnauthorizedResponse({ description: 'User is not authenticated' })
    async findOne(
        @Param('id', new ParseIntPipe()) id: number,
        @Request() req
    ) {
        return await this.contactService.findOne(id, req.user.id);
    }


    @Put(':id')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ 
        summary: 'Update contact', 
        description: 'Updates an existing contact by ID' 
    })
    @ApiParam({ 
        name: 'id', 
        description: 'The ID of the contact to update',
        type: Number 
    })
    @ApiBody({ type: UpdateContactDto })
    @ApiOkResponse({ 
        description: 'Contact updated successfully',
        type: ContactResponseDto
    })
    @ApiNotFoundResponse({ description: 'Contact not found' })
    @ApiUnauthorizedResponse({ description: 'User is not authenticated' })
    async update(
        @Param('id', new ParseIntPipe()) id: number,
        @Body(new CustomValidationPipe()) updateContactDto: UpdateContactDto,
        @Request() req
    ) {
        return await this.contactService.update(id, req.user.id, updateContactDto);
    }


    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ 
        summary: 'Delete contact', 
        description: 'Deletes a contact by ID' 
    })
    @ApiParam({ 
        name: 'id', 
        description: 'The ID of the contact to delete',
        type: Number 
    })
    @ApiResponse({ 
        status: HttpStatus.NO_CONTENT, 
        description: 'Contact deleted successfully' 
    })
    @ApiNotFoundResponse({ description: 'Contact not found' })
    @ApiUnauthorizedResponse({ description: 'User is not authenticated' })
    async remove(
        @Param('id', new ParseIntPipe()) id: number,
        @Request() req
    ) {
        await this.contactService.remove(id, req.user.id);
    }
}