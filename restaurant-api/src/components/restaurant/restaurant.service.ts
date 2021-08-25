import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MealService } from 'components/meal/meal.service';
import { User } from 'components/user/user.entity';
import { GenericService } from 'generics/generic.service';
import { Repository } from 'typeorm';

import { Restaurant } from './restaurant.entity';

@Injectable()
export class RestaurantService extends GenericService<Restaurant> {
  constructor(
    @InjectRepository(Restaurant)
    private readonly restaurantRepository: Repository<Restaurant>,
    private readonly mealService: MealService
  ) {
    super(restaurantRepository);
  }

  async listAll(loggedUser: User): Promise<Restaurant[]> {
    const restaurants = await this.restaurantRepository.find();

    return restaurants.filter((restaurant) => {
      const blockUsers = restaurant?.blockUsers || [];
      return !blockUsers.includes(loggedUser.id.toString());
    });
  }

  async findAllByCategory(loggedUser: User, categoryId: number): Promise<Restaurant[]> {
    const meals = await this.mealService.findAllByCategory(categoryId);
    const restaurants = await this.restaurantRepository.findByIds(
      meals.map((meal) => meal?.restaurant?.id)
    );

    return restaurants.filter((restaurant) => {
      const blockUsers = restaurant?.blockUsers || [];
      return !blockUsers.includes(loggedUser.id.toString());
    });
  }

  async oneByUser(user: User) {
    return this.restaurantRepository.findOne({
      where: { user: { id: user.id } }
    });
  }

  async createNew(user: User, restaurant: Restaurant) {
    const entity = this.restaurantRepository.create(restaurant);
    entity.user = user;
    return this.restaurantRepository.save(entity);
  }

  async toggleBlockUser(loggedUser: User, userId: number) {
    const restaurant = await this.oneByUser(loggedUser);

    if (restaurant) {
      if (restaurant.blockUsers) {
        let blockedUsers: number[] = JSON.parse(restaurant.blockUsers);

        if (blockedUsers.includes(userId)) {
          blockedUsers = blockedUsers.filter((id) => id !== userId);
        } else {
          blockedUsers.push(userId);
        }

        this.restaurantRepository.save({ ...restaurant, blockUsers: JSON.stringify(blockedUsers) });
      } else {
        this.restaurantRepository.save({ ...restaurant, blockUsers: JSON.stringify([userId]) });
      }
    }
  }
}
