import React, { SetStateAction, useContext } from 'react';

type IRestaurantMealContext = {
  categorySelected?: number;
  setCategorySelected: React.Dispatch<SetStateAction<number | undefined>>;
};

export const RestaurantMealContext = React.createContext<Partial<IRestaurantMealContext>>({});

export function useRestaurantMeal() {
  return useContext(RestaurantMealContext);
}
