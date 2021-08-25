import { FoodCategory } from 'components/food-category/food-category.entity';
import { Meal } from 'components/meal/meal.entity';
import { Restaurant } from 'components/restaurant/restaurant.entity';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class createFakeMeals1626895775439 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const foodCategoryRepo = queryRunner.connection.getRepository(FoodCategory);
    const restaurantRepo = queryRunner.connection.getRepository(Restaurant);
    const mealRepo = queryRunner.connection.getRepository(Meal);

    const categoryResult01 = await foodCategoryRepo.insert({ name: 'Popular' });
    const categoryResult02 = await foodCategoryRepo.insert({ name: 'Asian' });
    await foodCategoryRepo.insert({ name: 'Sushi' });
    await foodCategoryRepo.insert({ name: 'Soup' });
    await foodCategoryRepo.insert({ name: 'Dissert' });
    await foodCategoryRepo.insert({ name: 'Drink' });

    const category01 = categoryResult01.raw[0].id;
    const category02 = categoryResult02.raw[0].id;

    const firstRestaurant = await restaurantRepo.findOne(1);
    const secondRestaurant = await restaurantRepo.findOne(2);

    mealRepo.insert({
      name: 'Hamburger On Bun',
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      price: 28,
      restaurant: firstRestaurant,
      foodCategory: { id: category01 }
    });

    mealRepo.insert({
      name: 'Big Mc Burger',
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      price: 44.5,
      restaurant: secondRestaurant,
      foodCategory: { id: category01 }
    });

    mealRepo.insert({
      name: 'Deluxe Cheeseburger On Bun',
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      price: 48,
      restaurant: secondRestaurant,
      foodCategory: { id: category02 }
    });

    mealRepo.insert({
      name: 'Hot Dog - Plate',
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      price: 50.5,
      restaurant: firstRestaurant,
      foodCategory: { id: category02 }
    });

    mealRepo.insert({
      name: 'Chicken Roasted Deluxe',
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      price: 88,
      restaurant: secondRestaurant,
      foodCategory: { id: category02 }
    });
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
