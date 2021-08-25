import './MyRestaurantPage.scss';

import ModalProvider from 'common/modal/Modal';
import { Meal } from 'models/meal.model';
import { Restaurant } from 'models/restaurant.model';
import React, { useEffect, useState } from 'react';
import useMealService from 'services/meal.service';
import useRestaurantService from 'services/restaurant.service';

import Meals from './components/meals/Meals';
import MealsForm from './components/meals/meals-form/MealsForm';
import RestaurantForm from './components/restaurant-info/restaurant-form/RestaurantForm';
import RestaurantInfo from './components/restaurant-info/RestaurantInfo';

export default function MyRestaurantPage() {
  const mealService = useMealService();
  const restaurantService = useRestaurantService();

  const [meals, setMeals] = useState<Meal[]>([]);
  const [restaurant, setRestaurant] = useState<Restaurant>();

  useEffect(() => {
    loadRestaurant();
  }, []);

  function loadRestaurant() {
    restaurantService.onByUser().then((res) => {
      setRestaurant(res.data);
      getMeals(res.data.id);
    });
  }

  function getMeals(id?: number) {
    if (id) {
      mealService.allByRestaurant(id).then((res) => setMeals(res.data));
    }
  }

  return (
    <div className="MyRestaurantPage">
      <ModalProvider modalContent={<RestaurantForm />} onCloseModal={loadRestaurant}>
        <RestaurantInfo restaurant={restaurant} />
      </ModalProvider>

      {restaurant && (
        <ModalProvider
          modalContent={<MealsForm restaurant={restaurant} />}
          onCloseModal={loadRestaurant}>
          <Meals meals={meals} />
        </ModalProvider>
      )}
    </div>
  );
}
