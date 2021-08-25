import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { UserModule } from '../components/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';
import { FirebaseStrategy } from './strategies/firebase.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60m' }
    })
  ],
  providers: [AuthService, FirebaseStrategy, JwtStrategy, LocalStrategy],
  exports: [AuthService, FirebaseStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
