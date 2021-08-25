import { Meal } from './meal.model';
import { User } from './user.model';

export interface OrderItem {
  id: number;
  amount: number;
  meal: Meal;
  user?: User;
  createdAt?: Date;
}
