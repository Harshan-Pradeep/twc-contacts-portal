import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';
import { ContactNotFoundException } from '../exceptions/contact-not-found.exception';
import { ContactExistsException } from '../exceptions/contact-exists.exception';

@Catch(ContactNotFoundException, ContactExistsException)
export class ContactExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();

        response
            .status(status)
            .json({
                statusCode: status,
                message: exception.message,
                timestamp: new Date().toISOString(),
                path: request.url,
            });
    }
}