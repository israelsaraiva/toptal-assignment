import './RestaurantForm.scss';

import GenericForm from 'common/GenericForm';
import Input from 'common/input/Input';
import TextArea from 'common/input/Textarea';
import { useModalContext } from 'common/modal/Modal';
import { Restaurant } from 'models/restaurant.model';
import { useAppContext } from 'providers/app.provider';
import React from 'react';
import useRestaurantService from 'services/restaurant.service';
import * as yup from 'yup';

export default function RestaurantForm() {
  const { showSnackbar } = useAppContext();
  const { closeModal, initialData } = useModalContext();

  const restaurantService = useRestaurantService();

  const validationSchema = yup.object().shape({
    name: yup.string().required().min(3),
    description: yup.string().required()
  });

  function saveRestaurant(data: Restaurant) {
    if (initialData) {
      restaurantService.update(initialData.id, data).then(() => {
        showSnackbar?.({ variant: 'success', message: 'Restaurant successfully updated!' });
        closeModal?.(true);
      });
    } else {
      restaurantService.createNew(data).then(() => {
        showSnackbar?.({ variant: 'success', message: 'Restaurant successfully created!' });
        closeModal?.(true);
      });
    }
  }

  return (
    <GenericForm
      className="RestaurantForm"
      onValidate={saveRestaurant}
      initialData={initialData}
      validationSchema={validationSchema}>
      <h5>Create new Restaurant</h5>

      <br />

      <div className="row">
        <Input name="name" className="col-lg-12 mb-4" label="Name" placeholder="Restaurant name" />

        <TextArea
          name="description"
          className="col-lg-12 mb-4"
          label="Description"
          placeholder="Restaurant description"
          rows={10}
        />
      </div>

      <div>
        <button type="submit" className="btn btn-dark save-action me-3">
          Save
        </button>

        <button type="button" className="btn btn-secondary" onClick={() => closeModal?.(false)}>
          Close
        </button>
      </div>
    </GenericForm>
  );
}
