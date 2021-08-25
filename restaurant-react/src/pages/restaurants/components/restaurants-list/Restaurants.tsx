import './Restaurants.scss';

import { Restaurant } from 'models/restaurant.model';
import AppPagesEnum from 'pages/pages.enum';
import { useRestaurant } from 'pages/restaurants/userRestaurant';
import React, { useEffect, useState } from 'react';
import { BsHouseFill } from 'react-icons/bs';
import { useHistory } from 'react-router-dom';
import useRestaurantService from 'services/restaurant.service';

export default function Restaurants() {
  const { push } = useHistory();
  const restaurantService = useRestaurantService();
  const { categorySelected } = useRestaurant();

  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  useEffect(() => {
    if (categorySelected) {
      restaurantService.allByCategory(categorySelected).then((res) => {
        setRestaurants(res.data);
      });
    } else {
      restaurantService.all().then((res) => {
        setRestaurants(res.data);
      });
    }
  }, [categorySelected]);

  function openRestaurant(restaurant: Restaurant) {
    push({
      pathname: AppPagesEnum.RestaurantMeals,
      state: { restaurant }
    });
  }

  return (
    <div className="Restaurants">
      <div className="Restaurants-list">
        {restaurants.map((restaurant, index) => (
          <div
            key={restaurant.id}
            role="button"
            tabIndex={index}
            className="restaurant-container"
            onClick={() => openRestaurant(restaurant)}
            onKeyDown={() => openRestaurant(restaurant)}>
            <div className="restaurant-block">
              <BsHouseFill />
            </div>

            <div className="restaurant-info">
              <div className="restaurant-info-name">{restaurant.name}</div>
              <div className="restaurant-info-description">{restaurant.description}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
