import './OrderItems.scss';

import { OrderItem } from 'models/order-item.model';
import AppPagesEnum from 'pages/pages.enum';
import { useAppContext } from 'providers/app.provider';
import React, { useMemo, useState } from 'react';
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from 'react-icons/ai';
import { useHistory } from 'react-router-dom';
import useOrderService from 'services/order.service';

export default function OrderItems() {
  const { push } = useHistory();
  const { orderItems, orderRestaurantId, changeOrderItemUnit, clearCart } = useAppContext();
  const orderService = useOrderService();

  const [loading, setLoading] = useState(false);
  const [checkoutCompleted, setCheckoutCompleted] = useState(false);

  function doCheckout() {
    if (orderRestaurantId && orderItems) {
      setLoading(true);

      orderService
        .create(orderRestaurantId, orderItems)
        .then((res) => {
          setCheckoutCompleted(true);
          clearCart?.();
          push({ pathname: AppPagesEnum.OrderPlaced, state: { order: res.data } });
        })
        .finally(() => setLoading(false));
    }
  }

  const orderEmpty = useMemo(() => {
    return (
      (!orderItems || !orderItems.length) && (
        <div className="OrderItems-items-empty">Your order is empty.</div>
      )
    );
  }, [orderItems]);

  const totalValue = useMemo(() => {
    if (orderItems) {
      return orderItems
        .map((orderItem) => orderItem.amount * orderItem.meal.price)
        .reduce((prev, curr) => prev + curr, 0);
    }

    return 0;
  }, [orderItems]);

  const orderItemActions = (orderItem: OrderItem) => {
    return (
      <div className="cart-item-actions">
        <button type="button" onClick={() => changeOrderItemUnit?.(orderItem.meal.id, 'subtract')}>
          <AiOutlineMinusCircle />
        </button>
        <div>{orderItem.amount}</div>
        <button type="button" onClick={() => changeOrderItemUnit?.(orderItem.meal.id, 'sum')}>
          <AiOutlinePlusCircle />
        </button>
      </div>
    );
  };

  const buttonContent = useMemo(() => {
    if (loading) {
      return (
        <div className="spinner-border text-light" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      );
    }

    if (checkoutCompleted) {
      return <div className="text-center">View Order</div>;
    }

    return <div className="text-center">Proceed with checkout</div>;
  }, [loading, checkoutCompleted]);

  return (
    <div className="OrderItems">
      <div className="OrderItems-title mb-3">My order</div>
      <div className="OrderItems-items">
        {orderEmpty}

        <ul>
          {orderItems?.map((orderItem) => (
            <li key={orderItem.id}>
              <div className="cart-item-info">
                <div>{orderItem.amount}</div>
                <strong>x</strong>
                <div>{orderItem.meal.name}</div>
                <div className="cart-price">${orderItem.meal.price}</div>
              </div>
              {orderItemActions(orderItem)}
            </li>
          ))}
        </ul>
      </div>

      <div className="OrderItems-total">
        <strong>TOTAL:</strong> <span>${totalValue}</span>
      </div>

      <div className="OrderItems-action">
        {!!orderItems?.length && (
          <button
            type="button"
            className={`btn ${checkoutCompleted ? 'btn-dark' : 'btn-success'}`}
            onClick={doCheckout}>
            {buttonContent}
          </button>
        )}
      </div>
    </div>
  );
}
