import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'components/user/user.entity';
import { hashPassword } from 'utils/functions';

import { UserService } from '../components/user/user.service';
import { LoginResultDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService) {}

  async validateUser(email: string, pass: string): Promise<LoginResultDto | null> {
    const user = await this.userService.findByEmail(email);

    const encodedPass = hashPassword(pass);

    if (user && user.password === encodedPass) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async login(user: User) {
    const payload = { email: user.email, sub: user.id };

    const accessToken = this.jwtService.sign(payload);

    return { user, accessToken };
  }

  async register(user: User): Promise<User> {
    return this.userService.create(user);
  }

  async verifyToken(token: string): Promise<object> {
    try {
      const { sub, ...rest } = this.jwtService.verify(token);
      const { password, ...user } = await this.userService.findOne(sub);
      return { ...rest, user };
    } catch (error) {
      throw new HttpException('token expired', HttpStatus.UNAUTHORIZED);
    }
  }
}
