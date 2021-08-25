import { Controller, Get, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Role } from 'auth/enums/role.enum';
import { Roles } from 'auth/roles/roles.decorator';
import { Restaurant } from 'components/restaurant/restaurant.entity';
import { IAuthInfoRequest } from 'models/auth-info-request';

import { GenericController } from '../../generics/generic.controller';
import { User } from './user.entity';
import { UserService } from './user.service';

@ApiTags('users')
@Controller('user')
export class UserController extends GenericController<User> {
  constructor(private readonly userService: UserService) {
    super(userService);
  }
}
