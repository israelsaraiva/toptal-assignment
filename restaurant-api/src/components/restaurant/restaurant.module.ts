import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MealModule } from 'components/meal/meal.module';
import { OrderModule } from 'components/order/order.module';
import { UserModule } from 'components/user/user.module';

import { RestaurantController } from './restaurant.controller';
import { Restaurant } from './restaurant.entity';
import { RestaurantService } from './restaurant.service';

@Module({
  imports: [TypeOrmModule.forFeature([Restaurant]), UserModule, MealModule],
  providers: [RestaurantService],
  controllers: [RestaurantController],
  exports: [RestaurantService]
})
export class RestaurantModule {}
