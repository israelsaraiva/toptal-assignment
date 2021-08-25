import { Test, TestingModule } from '@nestjs/testing';
import { FoodCategoryController } from './food-category.controller';

describe('FoodCategoryController', () => {
  let controller: FoodCategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FoodCategoryController],
    }).compile();

    controller = module.get<FoodCategoryController>(FoodCategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
