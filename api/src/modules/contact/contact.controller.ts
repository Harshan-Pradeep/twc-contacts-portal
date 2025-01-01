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
    ValidationPipe,
    HttpCode,
    HttpStatus,
    ParseIntPipe
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ContactService } from './contact.service';
import { ContactDto } from './dto/contact.dto';

@Controller('contacts')
@UseGuards(JwtAuthGuard)
export class ContactController {
    constructor(private readonly contactService: ContactService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(
        @Body(ValidationPipe) contactDto: ContactDto,
        @Request() req
    ) {
        
        return await this.contactService.create(contactDto, req.user.id);
    }

    @Get()
    @UseGuards(JwtAuthGuard) 
    @HttpCode(HttpStatus.OK)
    async findAll(@Request() req) {
        console.log("iddd",req.user.id)
        return await this.contactService.findAll(req.user.id);
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async findOne(
        @Param('id', ParseIntPipe) id: number,
        @Request() req
    ) {
        return await this.contactService.findOne(id, req.user.id);
    }

    @Put(':id')
    @HttpCode(HttpStatus.OK)
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body(ValidationPipe) contactDto: ContactDto,
        @Request() req
    ) {
        return await this.contactService.update(id, req.user.id, contactDto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async remove(
        @Param('id', ParseIntPipe) id: number,
        @Request() req
    ) {
        await this.contactService.remove(id, req.user.id);
    }
}