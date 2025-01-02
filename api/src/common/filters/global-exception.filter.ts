import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
    Logger,
  } from '@nestjs/common';
  import { Request, Response } from 'express';
  
  /**
   * Global exception filter to handle all unhandled exceptions in the application
   * Transforms exceptions into a standardized error response format
   */
  @Catch()
  export class GlobalExceptionFilter implements ExceptionFilter {
    private readonly logger = new Logger('GlobalExceptionFilter');
  
    catch(exception: Error, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse<Response>();
      const request = ctx.getRequest<Request>();
  
      // Determine HTTP status code
      const status = 
        exception instanceof HttpException
          ? exception.getStatus()
          : HttpStatus.INTERNAL_SERVER_ERROR;
  
      // Get detailed error message
      const message = 
        exception instanceof HttpException
          ? exception.getResponse()
          : exception.message;
  
      // Log the error
      this.logger.error(
        `${request.method} ${request.url}`,
        exception.stack,
        'ExceptionFilter'
      );
  
      // Structured error response
      const errorResponse = {
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        method: request.method,
        message: message,
        ...(process.env.NODE_ENV === 'development' && { stack: exception.stack }),
      };
  
      response.status(status).json(errorResponse);
    }
  }