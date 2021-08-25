import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Role } from 'auth/enums/role.enum';
import { Roles } from 'auth/roles/roles.decorator';
import { GenericController } from 'generics/generic.controller';
import { IAuthInfoRequest } from 'models/auth-info-request';

import { Restaurant } from './restaurant.entity';
import { RestaurantService } from './restaurant.service';

@ApiTags('restaurants')
@Roles(Role.Admin, Role.RestaurantOwner)
@Controller('restaurant')
export class RestaurantController extends GenericController<Restaurant> {
  constructor(private readonly restaurantService: RestaurantService) {
    super(restaurantService);
  }

  @Roles(Role.Admin, Role.RestaurantOwner, Role.User)
  @Get('list-all')
  listAll(@Req() { user }: IAuthInfoRequest): Promise<Restaurant[]> {
    return this.restaurantService.listAll(user);
  }

  @Roles(Role.Admin, Role.RestaurantOwner, Role.User)
  @Get('all-by-category/:categoryId')
  allByCategory(
    @Req() { user }: IAuthInfoRequest,
    @Param('categoryId') id: string
  ): Promise<Restaurant[]> {
    return this.restaurantService.findAllByCategory(user, Number(id));
  }

  @Roles(Role.Admin, Role.RestaurantOwner)
  @Get('one-by-user')
  oneByUser(@Req() { user }: IAuthInfoRequest): Promise<Restaurant> {
    return this.restaurantService.oneByUser(user);
  }

  @Roles(Role.Admin, Role.RestaurantOwner)
  @Post('create-new')
  createNew(@Req() { user }: IAuthInfoRequest, @Body() restaurant: Restaurant) {
    return this.restaurantService.createNew(user, restaurant);
  }

  @Roles(Role.Admin, Role.RestaurantOwner)
  @Post('toggle-block-user/:userId')
  toggleBlockUser(@Req() { user }: IAuthInfoRequest, @Param() { userId }: { userId: string }) {
    return this.restaurantService.toggleBlockUser(user, Number(userId));
  }
}
