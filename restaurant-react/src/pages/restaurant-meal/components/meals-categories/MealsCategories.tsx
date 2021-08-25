import './MealsCategories.scss';

import { FoodCategory } from 'models/food-category.model';
import { useRestaurantMeal } from 'pages/restaurant-meal/userRestaurantMeal';
import React, { useEffect, useState } from 'react';
import useFoodCategoryService from 'services/food-category.service';

export default function MealsCategories() {
  const foodCategoryService = useFoodCategoryService();

  const { categorySelected, setCategorySelected } = useRestaurantMeal();

  const [categories, setCategories] = useState<FoodCategory[]>([]);

  useEffect(() => {
    foodCategoryService.all().then((res) => {
      const allCategories: FoodCategory = { id: 0, name: 'All' };
      setCategories([allCategories, ...res.data]);
      setCategorySelected?.(0);
    });
  }, []);

  return (
    <div className="MealsCategories">
      <h5>Categories</h5>

      <ul className="MealsCategories-list">
        {categories.map((category) => (
          <li key={category.id} className={category.id === categorySelected ? 'active' : ''}>
            <button type="button" onClick={() => setCategorySelected?.(category.id)}>
              {category.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
