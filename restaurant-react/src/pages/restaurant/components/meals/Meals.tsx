import './Meals.scss';

import { useModalContext } from 'common/modal/Modal';
import { Meal } from 'models/meal.model';
import React, { useMemo } from 'react';

type MealsProps = {
  meals: Meal[];
};

export default function Meals({ meals }: MealsProps) {
  const { openModal } = useModalContext();

  const mealsTable = useMemo(() => {
    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {meals?.map((meal) => (
            <tr key={meal.id} onClick={() => openModal?.(meal)}>
              <td>{meal.name}</td>
              <td>{meal.description}</td>
              <td>${meal.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }, [meals]);

  return (
    <div className="Meals">
      <div className="Meals-title-container">
        <h5>Restaurant Meals</h5>
        <button type="button" className="btn btn-dark" onClick={() => openModal?.()}>
          Add new meal
        </button>
      </div>

      <br />

      {!!meals.length && mealsTable}

      {!meals.length && (
        <div>
          <br />
          <h6 className="text-center">No meals found.</h6>
        </div>
      )}
    </div>
  );
}
