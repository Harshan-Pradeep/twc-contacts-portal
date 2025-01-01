import { 
    BadRequestException, 
    Body, 
    Controller, 
    Get, 
    HttpCode, 
    HttpStatus, 
    Post, 
    Req,
    Res,
    UnauthorizedException,
    UseGuards, 
    ValidationPipe 
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { AuthTransformer } from './transformers/auth.transformer';
import { CookieService } from './cookie.service';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private cookieService: CookieService
    ) {}

    @Post('register')
    @HttpCode(HttpStatus.CREATED)
    async register(
        @Body(new ValidationPipe({ 
            whitelist: true,
            transform: true 
        })) 
        registerDto: RegisterDto,
        @Res({ passthrough: true }) res: Response
    ) {
        try {
            const user = await this.authService.register(
                registerDto.email, 
                registerDto.password
            );
            
            // Generate token and set cookie
            const { access_token } = await this.authService.login(user);
            this.cookieService.setToken(res, access_token);
            
            // Return user data without token in body
            return AuthTransformer.toResponse(user);
        } catch (error) {
            if (error.message === 'Email already exists') {
                throw new BadRequestException('Email already exists');
            }
            throw error;
        }
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    @UseGuards(LocalAuthGuard)
    async login(
        @Body(new ValidationPipe({ 
            whitelist: true,
            transform: true 
        })) 
        loginDto: LoginDto,
        @Req() req,
        @Res({ passthrough: true }) res: Response
    ) {
 
    const user = await this.authService.validateUser(loginDto.email, loginDto.password);
    if (!user) {
        throw new UnauthorizedException('Invalid credentials');
    }

    const { access_token } = await this.authService.login(user);
    this.cookieService.setToken(res, access_token);
    return AuthTransformer.toResponse(user);
    }

    @Post('logout')
    @HttpCode(HttpStatus.OK)
    @UseGuards(JwtAuthGuard)
    async logout(@Res({ passthrough: true }) res: Response) {
        // Clear JWT cookie
        this.cookieService.clearToken(res);
        return { message: 'Logged out successfully' };
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    async getProfile(@Req() req) {
        return this.authService.getUserProfile(req.user.id);
    }
}