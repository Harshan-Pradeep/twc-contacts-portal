import { Injectable } from '@nestjs/common';
import { Response } from 'express';

@Injectable()
export class CookieService {
    private readonly cookieConfig = {
        httpOnly: true,
        secure: false,
        sameSite: 'strict' as const,
        maxAge: 24 * 60 * 60 * 1000,
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