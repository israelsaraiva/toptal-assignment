import './MealsForm.scss';

import GenericForm from 'common/GenericForm';
import Input from 'common/input/Input';
import TextArea from 'common/input/Textarea';
import { useModalContext } from 'common/modal/Modal';
import { Meal } from 'models/meal.model';
import { Restaurant } from 'models/restaurant.model';
import { useAppContext } from 'providers/app.provider';
import React from 'react';
import useMealService from 'services/meal.service';
import * as yup from 'yup';

type MealsProps = {
  restaurant: Restaurant;
};

export default function MealsForm({ restaurant }: MealsProps) {
  const { showSnackbar } = useAppContext();
  const { initialData, closeModal } = useModalContext();

  const mealService = useMealService();

  const validationSchema = yup.object().shape({
    name: yup.string().required().min(3),
    description: yup.string().required(),
    price: yup.number().required().positive().integer()
  });

  function saveMeal(data: Meal) {
    if (initialData) {
      mealService.update(initialData.id, data).then(() => {
        showSnackbar?.({ variant: 'success', message: 'Meal successfully updated!' });
        closeModal?.(true);
      });
    } else {
      mealService.create({ ...data, restaurant }).then(() => {
        showSnackbar?.({ variant: 'success', message: 'Meal successfully created!' });
        closeModal?.(true);
      });
    }
  }

  return (
    <div className="row">
      <GenericForm
        onValidate={saveMeal}
        validationSchema={validationSchema}
        initialData={initialData}
        className="MealsForm">
        <Input name="name" className="col-lg-12 mb-4" label="Name" placeholder="Meal name" />

        <TextArea
          name="description"
          className="col-lg-12 mb-4"
          label="Description"
          placeholder="Meal description"
          rows={5}
        />

        <Input name="price" className="col-lg-6 mb-4" label="Price" placeholder="Meal price" />

        <button type="submit" className="btn btn-dark save-action me-3">
          Save changes
        </button>

        <button type="button" className="btn btn-secondary" onClick={() => closeModal?.(false)}>
          Close
        </button>
      </GenericForm>
    </div>
  );
}
