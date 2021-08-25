import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'components/user/user.module';
import { MealController } from './meal.controller';
import { Meal } from './meal.entity';
import { MealService } from './meal.service';

@Module({
  imports: [TypeOrmModule.forFeature([Meal]), UserModule],
  providers: [MealService],
  controllers: [MealController],
  exports: [MealService]
})
export class MealModule {}
