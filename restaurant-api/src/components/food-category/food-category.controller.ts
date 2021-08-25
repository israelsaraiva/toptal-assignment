import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Role } from 'auth/enums/role.enum';
import { Roles } from 'auth/roles/roles.decorator';
import { GenericController } from 'generics/generic.controller';

import { FoodCategory } from './food-category.entity';
import { FoodCategoryService } from './food-category.service';

@ApiTags('food-category')
@Roles(Role.Admin, Role.RestaurantOwner)
@Controller('food-category')
export class FoodCategoryController extends GenericController<FoodCategory> {
  constructor(private readonly foodCategoryService: FoodCategoryService) {
    super(foodCategoryService);
  }

  @Roles(Role.Admin, Role.RestaurantOwner, Role.User)
  @Get('all')
  all(): Promise<FoodCategory[]> {
    return this.foodCategoryService.findAll();
  }
}
