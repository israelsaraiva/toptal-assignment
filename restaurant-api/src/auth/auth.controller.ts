import { Body, Controller, Get, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { User } from 'components/user/user.entity';
import { IAuthInfoRequest } from 'models/auth-info-request';

import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() request: IAuthInfoRequest) {
    return this.authService.login(request.user);
  }

  @ApiBody({ type: User })
  @Post('register')
  async register(@Body() user: User) {
    return this.authService.register(user);
  }

  @Get('verify-token')
  async verifyToken(@Query() query: { token: string }) {
    const { token } = query;
    return this.authService.verifyToken(token);
  }
}
