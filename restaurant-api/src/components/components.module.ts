import { Module } from '@nestjs/common';

import { FoodCategoryModule } from './food-category/food-category.module';
import { HistoryModule } from './history/history.module';
import { MealModule } from './meal/meal.module';
import { OrderModule } from './order/order.module';
import { RestaurantModule } from './restaurant/restaurant.module';
import { UserModule } from './user/user.module';
import { OrderItemModule } from './order-item/order-item.module';

@Module({
  imports: [
    FoodCategoryModule,
    MealModule,
    OrderModule,
    RestaurantModule,
    UserModule,
    HistoryModule,
    OrderItemModule
  ]
})
export class ComponentsModule {}
