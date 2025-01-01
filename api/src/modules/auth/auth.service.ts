import { ConflictException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepositoy } from './repositories/user.repository';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { subscribe } from 'diagnostics_channel';
import { User } from './entities/user.entity';
import { PasswordUtil } from 'src/common/utils/password.util';
import { resourceLimits } from 'worker_threads';

@Injectable()
export class AuthService {
    constructor(
        @Inject('IUserRepository')
        private userRepository: UserRepositoy,
        private jwtService: JwtService
    ) {}

    async register(email: string, password: string): Promise<Omit<User, 'password'>> {
        const existingUser = await this.userRepository.findByEmail(email);
        if(existingUser) {
            throw new ConflictException('Email already exists');
        }

        const hashedPassword = await PasswordUtil.hash(password);
        const user = await this.userRepository.create({
            email,
            password: hashedPassword
        });

        const { password: _, ...result } = user;
        return result;
    }

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            return null;
        }

        const isPasswordValid = await PasswordUtil.compare(password, user.password);
        if (!isPasswordValid) {
            return null;
        }

        const { password: _, ...result } = user;
        return result;
    }

    async login(user: any) {
        const payload = { email: user.email, sub: user.id };
        return {
            user: {
                id: user.id,
                email: user.email
            },
            access_token: this.jwtService.sign(payload),
        };
    }

    async validateToken(payload: any): Promise<any> {
        const user  = await this.userRepository.findById(payload.sub);

        if(!user) {
            throw new UnauthorizedException();
        }
        return user;
    }

    async getUserProfile(userId: number): Promise<Omit<User, 'password'>> {
        const user = await this.userRepository.findById(userId);
        if(!user) {
            throw new UnauthorizedException();
        }
        const { password: _, ...result } = user;
        return result;
    }

}
