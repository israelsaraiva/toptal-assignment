import { Controller, Get, Request } from '@nestjs/common';
import { ExtractJwt } from 'passport-jwt';

import { AppService } from './app.service';

@Controller('app')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('test')
  test(@Request() req) {
    const extractor = ExtractJwt.fromAuthHeaderAsBearerToken();
    console.log(extractor(req));
    return this.appService.test();
  }
}
