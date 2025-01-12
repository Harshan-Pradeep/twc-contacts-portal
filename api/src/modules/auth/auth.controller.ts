import {
    Controller,
    Post,
    Body,
    HttpCode,
    HttpStatus,
    UseGuards,
    Get,
    Req,
    Res,
    UseInterceptors,
    Logger,
    SerializeOptions,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { CookieService } from './cookie.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { AuthTransformer } from './transformers/auth.transformer';
import { CustomValidationPipe } from '../../common/pipes/validation.pipe';
import { LoggingInterceptor } from '../../common/interceptors/logging.interceptor';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ResponseInterceptor } from 'src/common/interceptors/response.interceptor';
import { GoogleAuthGuard } from './guards/google-auth.guard';

@ApiTags('Authentication APIs')
@Controller('auth')
@UseInterceptors(ResponseInterceptor, LoggingInterceptor)
@SerializeOptions({ strategy: 'excludeAll' })
export class AuthController {
    private readonly logger = new Logger(AuthController.name);

    constructor(
        private readonly authService: AuthService,
        private readonly cookieService: CookieService,
    ) { }

    @Post('register')
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Register a new user' })
    @ApiResponse({ status: HttpStatus.CREATED, description: 'User successfully registered' })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid input data' })
    @ApiResponse({ status: HttpStatus.CONFLICT, description: 'Email already exists' })
    async register(
        @Body(new CustomValidationPipe()) registerDto: RegisterDto,
        @Res({ passthrough: true }) res: Response,
    ) {
        this.logger.log(`Attempting to register user: ${registerDto.email}`);

        const user = await this.authService.register(
            registerDto.email,
            registerDto.password,
        );

        const { access_token } = await this.authService.login(user);
        this.cookieService.setToken(res, access_token);

        this.logger.log(`Successfully registered user: ${user.email}`);
        return AuthTransformer.toResponse(user);
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    @UseGuards(LocalAuthGuard)
    @ApiOperation({ summary: 'Login user' })
    @ApiResponse({ status: HttpStatus.OK, description: 'User successfully logged in' })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Invalid credentials' })
    async login(
        @Body(new CustomValidationPipe()) loginDto: LoginDto,
        @Req() req,
        @Res({ passthrough: true }) res: Response,
    ) {
        this.logger.log(`Login attempt for user: ${loginDto.email}`);

        const user = req.user;
        const { access_token } = await this.authService.login(user);
        this.cookieService.setToken(res, access_token);

        this.logger.log(`Successfully logged in user: ${user.email}`);
        return AuthTransformer.toResponse(user);
    }

    @Post('logout')
    @HttpCode(HttpStatus.OK)
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Logout user' })
    @ApiResponse({ status: HttpStatus.OK, description: 'User successfully logged out' })
    async logout(@Req() req, @Res({ passthrough: true }) res: Response) {
        this.logger.log(`Logout for user ID: ${req.user.id}`);
        this.cookieService.clearToken(res);
        return { message: 'Logged out successfully' };
    }

    @Get('profile')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get user profile' })
    @ApiResponse({ status: HttpStatus.OK, description: 'User profile retrieved successfully' })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'User not authenticated' })
    async getProfile(@Req() req) {
        this.logger.log(`Retrieving profile for user ID: ${req.user.id}`);
        const user = await this.authService.getUserProfile(req.user.id);
        return {
            email: user.email,
            isGoogleAccount: user.isGoogleAccount
        };
    }

    @Get('google')
    @UseGuards(GoogleAuthGuard)
    async googleAuth() { }

    @Get('google/callback')
@UseGuards(GoogleAuthGuard)
async googleAuthCallback(@Req() req, @Res() res: Response) {
    try {
        const result = await this.authService.googleLogin(req.user);
        this.cookieService.setToken(res, result.access_token);
        
        return res.redirect(`${process.env.FRONTEND_URL}/login?fromGoogle=true`);
    } catch (error) {
        return res.redirect(`${process.env.FRONTEND_URL}/login?error=authentication_failed`);
    }
}
}