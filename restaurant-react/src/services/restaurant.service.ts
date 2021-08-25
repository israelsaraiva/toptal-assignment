import { Restaurant } from 'models/restaurant.model';
import { User } from 'models/user.model';

import useHttpService from './http.service';

export default function useRestaurantService() {
  const url = 'restaurant';

  const { instance, ...genericFunctions } = useHttpService<Restaurant>(url);

  function all() {
    return instance.get<Restaurant[]>(`${url}/list-all`);
  }

  function onByUser() {
    return instance.get<Restaurant>(`${url}/one-by-user`);
  }

  function allByCategory(categoryId: number) {
    return instance.get<Restaurant[]>(`${url}/all-by-category/${categoryId}`);
  }

  function createNew(restaurant: Restaurant) {
    return instance.post<Restaurant>(`${url}/create-new`, restaurant);
  }

  function toggleBlockUser(user: User) {
    return instance.post<void>(`${url}/toggle-block-user/${user.id}`);
  }

  return { ...genericFunctions, all, onByUser, allByCategory, createNew, toggleBlockUser };
}
