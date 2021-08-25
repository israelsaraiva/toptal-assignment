import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GenericService } from 'generics/generic.service';
import { Repository } from 'typeorm';

import { FoodCategory } from './food-category.entity';

@Injectable()
export class FoodCategoryService extends GenericService<FoodCategory> {
  constructor(
    @InjectRepository(FoodCategory)
    private readonly foodCategoryRepository: Repository<FoodCategory>
  ) {
    super(foodCategoryRepository);
  }
}
