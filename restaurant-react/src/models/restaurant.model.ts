import { Meal } from './meal.model';

export interface Restaurant {
  id: number;
  name: string;
  description: string;
  meals: Meal[];
  blockUsers: string;
}
