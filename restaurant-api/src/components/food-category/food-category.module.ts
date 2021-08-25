import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'components/user/user.module';

import { FoodCategoryController } from './food-category.controller';
import { FoodCategory } from './food-category.entity';
import { FoodCategoryService } from './food-category.service';

@Module({
  imports: [TypeOrmModule.forFeature([FoodCategory]), UserModule],
  controllers: [FoodCategoryController],
  providers: [FoodCategoryService],
  exports: [FoodCategoryService]
})
export class FoodCategoryModule {}
