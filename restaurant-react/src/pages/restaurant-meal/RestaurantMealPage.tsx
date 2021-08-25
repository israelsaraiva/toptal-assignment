import './RestaurantMealPage.scss';

import { Meal } from 'models/meal.model';
import { Restaurant } from 'models/restaurant.model';
import React, { useEffect, useState } from 'react';
import { FaBox } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import useMealService from 'services/meal.service';

import { useAppContext } from 'providers/app.provider';
import MealsCategories from './components/meals-categories/MealsCategories';
import { RestaurantMealContext } from './userRestaurantMeal';

type LocationState = {
  restaurant: Restaurant;
};

export default function RestaurantMealPage() {
  const {
    state: { restaurant }
  } = useLocation<LocationState>();
  const { addMealToCart } = useAppContext();

  const mealService = useMealService();

  const [meals, setMeals] = useState<Meal[]>([]);
  const [categorySelected, setCategorySelected] = useState<number>();

  useEffect(() => {
    mealService.allByRestaurant(restaurant.id, categorySelected).then((res) => {
      setMeals(res.data);
    });
  }, [restaurant, categorySelected]);

  return (
    <RestaurantMealContext.Provider value={{ categorySelected, setCategorySelected }}>
      <div className="RestaurantMealPage">
        <div className="RestaurantMealPage-restaurant">
          <h4>{restaurant.name}</h4>
          <p>{restaurant.description}</p>
        </div>

        <div className="RestaurantMealPage-meals">
          <MealsCategories />
          <div className="RestaurantMealPage-meals-list">
            {meals.map((meal) => (
              <div key={meal.id} className="meal-container">
                <div className="meal-container-picture">
                  <FaBox />
                </div>

                <div className="meal-container-name">{meal.name}</div>
                <div className="meal-container-description">{meal.description}</div>
                <div className="meal-container-actions">
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={() => addMealToCart?.(restaurant.id, meal)}>
                    Add To Cart
                  </button>

                  <span className="meal-price">${meal.price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </RestaurantMealContext.Provider>
  );
}
