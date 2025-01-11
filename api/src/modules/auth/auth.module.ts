import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { DatabaseModule } from 'src/common/database/database.module';
import { UserRepositoy } from './repositories/user.repository';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import 'dotenv/config';
import { CookieService } from './cookie.service';
import { GoogleStrategy } from './strategies/google.strategy';

console.log('JWT_SECRET:', process.env.JWT_SECRET);
@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '24h' }
    }),
    DatabaseModule],
  providers: [
    {
      provide: 'IUserRepository',
      useClass: UserRepositoy
    },
    AuthService,
    CookieService,
    JwtStrategy,
    LocalStrategy,
    GoogleStrategy
  ],
  controllers: [AuthController],
  exports: ['IUserRepository', AuthService]
})
export class AuthModule {}
