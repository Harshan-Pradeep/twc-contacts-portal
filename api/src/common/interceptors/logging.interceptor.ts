// src/common/interceptors/logging.interceptor.ts

import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    Logger,
  } from '@nestjs/common';
  import { Observable } from 'rxjs';
  import { tap } from 'rxjs/operators';
  import { Request, Response } from 'express';
  
  /**
   * Global interceptor for logging requests and responses
   * Measures request processing time and logs request/response details
   */
  @Injectable()
  export class LoggingInterceptor implements NestInterceptor {
    private readonly logger = new Logger('HTTP');
  
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      const ctx = context.switchToHttp();
      const request = ctx.getRequest<Request>();
      const response = ctx.getResponse<Response>();
      const requestTime = Date.now();
      const { method, originalUrl, body, params, query } = request;
  
      // Log request
      this.logger.log(
        `Incoming Request - ${method} ${originalUrl}
        Body: ${JSON.stringify(body)}
        Params: ${JSON.stringify(params)}
        Query: ${JSON.stringify(query)}`
      );
  
      return next.handle().pipe(
        tap({
          next: (data: any) => {
            const responseTime = Date.now() - requestTime;
            
            // Log response
            this.logger.log(
              `Outgoing Response - ${method} ${originalUrl}
              Status: ${response.statusCode}
              Time: ${responseTime}ms
              Response: ${JSON.stringify(data)}`
            );
          },
          error: (error: any) => {
            const responseTime = Date.now() - requestTime;
            
            // Log error
            this.logger.error(
              `Request Failed - ${method} ${originalUrl}
              Status: ${error.status}
              Time: ${responseTime}ms
              Error: ${JSON.stringify(error.message)}`
            );
          },
        }),
      );
    }
  }