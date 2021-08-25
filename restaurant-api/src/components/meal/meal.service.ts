import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HistoryService } from 'components/history/history.service';
import { GenericService } from 'generics/generic.service';
import { FindConditions, Repository } from 'typeorm';

import { Meal } from './meal.entity';

export interface IAllByRestaurant {
  restaurantId: string;
  categoryId?: string;
}

@Injectable()
export class MealService extends GenericService<Meal> {
  constructor(
    @InjectRepository(Meal)
    private readonly mealRepository: Repository<Meal>
  ) {
    super(mealRepository);
  }

  async findAllByCategory(categoryId: number): Promise<Meal[]> {
    return this.mealRepository.find({
      where: { foodCategory: { id: categoryId } },
      relations: ['restaurant']
    });
  }

  async findAllByRestaurant({ restaurantId, categoryId }: IAllByRestaurant): Promise<Meal[]> {
    const where: FindConditions<Meal> = { restaurant: { id: Number(restaurantId) } };

    if (categoryId) {
      where.foodCategory = { id: Number(categoryId) };
    }

    return this.mealRepository.find({ where });
  }
}
