import './RestaurantsPage.scss';

import React, { useState } from 'react';

import RestaurantsCategories from './components/restaurants-categories/RestaurantsCategories';
import Restaurants from './components/restaurants-list/Restaurants';
import { RestaurantContext } from './userRestaurant';

export default function RestaurantsPage() {
  const [categorySelected, setCategorySelected] = useState<number>();

  return (
    <RestaurantContext.Provider value={{ categorySelected, setCategorySelected }}>
      <div className="RestaurantsPage">
        <RestaurantsCategories />

        <Restaurants />
      </div>
    </RestaurantContext.Provider>
  );
}
