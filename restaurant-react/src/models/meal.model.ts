import { Restaurant } from './restaurant.model';

export interface Meal {
  id: number;
  name: string;
  description: string;
  price: number;
  restaurant: Restaurant;
}
