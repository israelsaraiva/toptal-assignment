import { Meal } from 'models/meal.model';

import useHttpService from './http.service';

export default function useMealService() {
  const url = 'meal';

  const { instance, ...genericFunctions } = useHttpService<Meal>(url);

  function allByRestaurant(restaurantId: number, categoryId?: number) {
    const data = { restaurantId, categoryId };
    return instance.post<Meal[]>(`${url}/all-by-restaurant/`, data);
  }

  return { ...genericFunctions, allByRestaurant };
}
