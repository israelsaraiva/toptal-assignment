import React from 'react';
import './OrderPlacedPage.scss';

import delivery from 'assets/illustrations/delivery-amico.svg';
import { Order } from 'models/order.model';
import { useHistory, useLocation } from 'react-router-dom';
import AppPagesEnum from 'pages/pages.enum';

type LocationState = {
  order: Order;
};

export default function OrderPlacedPage() {
  const { push } = useHistory();

  const { state } = useLocation<LocationState>();

  function viewOrder() {
    push({
      pathname: AppPagesEnum.Order,
      state: { order: state?.order }
    });
  }

  return (
    <div className="OrderPlacedPage">
      <div className="OrderPlacedPage-container">
        <img src={delivery} alt="delivery" />

        <h5>You have successfully placed your order!</h5>

        <br />

        <button type="button" className="btn btn-dark" onClick={viewOrder}>
          View Order
        </button>
      </div>
    </div>
  );
}
