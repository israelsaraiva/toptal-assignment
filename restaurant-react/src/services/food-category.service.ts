import { FoodCategory } from 'models/food-category.model';

import useHttpService from './http.service';

export default function useFoodCategoryService() {
  return useHttpService<FoodCategory>('food-category');
}
