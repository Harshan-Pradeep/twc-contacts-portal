// src/auth/services/cookie.service.ts
import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { cookieConfig } from 'src/config/cookie.config';


@Injectable()
export class CookieService {
    private readonly cookieConfig = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict' as const,
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
        path: '/',
    };

    setToken(res: Response, token: string) {
        if (!token) {
            throw new Error('Invalid or empty token cannot be set in cookie.');
        }
        res.cookie('jwt', token, this.cookieConfig);
    }
    

    clearToken(res: Response) {
        res.clearCookie('jwt', {
            ...this.cookieConfig,
            maxAge: 0
        });
    }
}