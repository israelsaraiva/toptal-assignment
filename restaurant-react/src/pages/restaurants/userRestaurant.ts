import React, { SetStateAction, useContext } from 'react';

type IRestaurantContext = {
  categorySelected?: number;
  setCategorySelected: React.Dispatch<SetStateAction<number | undefined>>;
};

export const RestaurantContext = React.createContext<Partial<IRestaurantContext>>({});

export function useRestaurant() {
  return useContext(RestaurantContext);
}
