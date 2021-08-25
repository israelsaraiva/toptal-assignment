import './RestaurantsCategories.scss';

import { FoodCategory } from 'models/food-category.model';
import { useRestaurant } from 'pages/restaurants/userRestaurant';
import React, { useEffect, useState } from 'react';
import useFoodCategoryService from 'services/food-category.service';

export default function RestaurantsCategories() {
  const foodCategoryService = useFoodCategoryService();

  const { categorySelected, setCategorySelected } = useRestaurant();

  const [categories, setCategories] = useState<FoodCategory[]>([]);

  useEffect(() => {
    foodCategoryService.all().then((res) => {
      const allCategories: FoodCategory = { id: 0, name: 'All' };
      setCategories([allCategories, ...res.data]);
      setCategorySelected?.(0);
    });
  }, []);

  return (
    <div className="RestaurantsCategories">
      <h5>Categories</h5>

      <ul className="RestaurantsCategories-list">
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
