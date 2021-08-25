import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Role } from 'auth/enums/role.enum';
import { Roles } from 'auth/roles/roles.decorator';
import { GenericController } from 'generics/generic.controller';

import { Meal } from './meal.entity';
import { MealService } from './meal.service';

export interface IAllByRestaurant {
  restaurantId: string;
  categoryId?: string;
}

@ApiTags('meal')
@Roles(Role.Admin, Role.RestaurantOwner)
@Controller('meal')
export class MealController extends GenericController<Meal> {
  constructor(private readonly mealService: MealService) {
    super(mealService);
  }

  @Roles(Role.Admin, Role.RestaurantOwner, Role.User)
  @Post('all-by-restaurant')
  allByRestaurant(@Body() data: IAllByRestaurant): Promise<Meal[]> {
    return this.mealService.findAllByRestaurant(data);
  }
}
