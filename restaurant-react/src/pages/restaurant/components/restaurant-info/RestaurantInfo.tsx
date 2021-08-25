import './RestaurantInfo.scss';

import { useModalContext } from 'common/modal/Modal';
import { Restaurant } from 'models/restaurant.model';
import React from 'react';

type RestaurantInfoProps = {
  restaurant?: Restaurant;
};

export default function RestaurantInfo({ restaurant }: RestaurantInfoProps) {
  const { openModal } = useModalContext();

  return (
    <div className="RestaurantInfo">
      <h5>Restaurant Info</h5>

      <br />

      {restaurant && (
        <div>
          <div>
            <strong>Restaurant Name:</strong> <span>{restaurant?.name}</span>
          </div>

          <br />

          <strong>Restaurant Description:</strong>
          <div>{restaurant?.description}</div>
          <br />
        </div>
      )}

      <div>
        {!restaurant && <h6>No one registered restaurant was found.</h6>}

        <button type="button" className="btn btn-dark" onClick={() => openModal?.(restaurant)}>
          {restaurant ? 'Edit info' : 'Create new restaurant'}
        </button>
      </div>
    </div>
  );
}
