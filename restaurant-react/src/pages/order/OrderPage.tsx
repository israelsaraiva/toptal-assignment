import './OrderPage.scss';

import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineSeparator
} from '@material-ui/lab';
import { Order, OrderStatus, OrderStatusFlow } from 'models/order.model';
import moment from 'moment';
import AppPagesEnum from 'pages/pages.enum';
import { useAppContext } from 'providers/app.provider';
import { Role, useAuth } from 'providers/auth.provider';
import React, { useMemo } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import useOrderService from 'services/order.service';

type LocationState = {
  order: Order;
};

const statusList = [
  { id: 1, label: 'Order Placed' },
  { id: 2, label: 'Processing' },
  { id: 3, label: 'In Route' },
  { id: 4, label: 'Delivered' },
  { id: 5, label: 'Received' }
];

export default function OrderPage() {
  const {
    state: { order }
  } = useLocation<LocationState>();
  const { currentUser } = useAuth();
  const { showSnackbar } = useAppContext();
  const { push } = useHistory();

  const orderService = useOrderService();

  function formatDate(date: Date) {
    return moment(date).format('DD/MM/YYYY HH:mm');
  }

  const executeOrderButtonLabel = useMemo(() => {
    switch (order.status) {
      case OrderStatus.Placed:
        return 'Process the Order';

      case OrderStatus.Processing:
        return 'Send to Delivery';

      case OrderStatus.InRoute:
        return 'Notify Order Delivered';

      case OrderStatus.Delivered:
        return 'Notify Order Received';

      default:
        return '';
    }
  }, [order]);

  const isRestaurantOwner = useMemo(
    () => currentUser?.roles.includes(Role.RestaurantOwner),
    [currentUser]
  );

  const executeOrderButtonVisible = useMemo(() => {
    const restaurantStatuses = [OrderStatus.Placed, OrderStatus.Processing, OrderStatus.InRoute];
    const userStatuses = [OrderStatus.Delivered];
    return (
      (restaurantStatuses.includes(order.status) && isRestaurantOwner) ||
      (userStatuses.includes(order.status) && !isRestaurantOwner)
    );
  }, [order?.status, isRestaurantOwner]);

  const cancelOrderButtonVisible = useMemo(() => {
    const completedStatuses = [OrderStatus.Canceled, OrderStatus.Delivered, OrderStatus.Received];
    return !completedStatuses.includes(order?.status);
  }, [order?.status, isRestaurantOwner]);

  const currentStatusIndex = useMemo(() => {
    return OrderStatusFlow.findIndex((status) => status === order.status);
  }, [order]);

  function executeOrder() {
    if (order) {
      orderService.executeOrder(order).then(() => {
        showSnackbar?.({ variant: 'success', message: 'Order successfully updated!' });
        push(AppPagesEnum.OrderList);
      });
    }
  }

  function cancelOrder() {
    if (order) {
      orderService.cancel(order.id).then(() => {
        showSnackbar?.({ variant: 'success', message: 'The order was canceled!' });
        push(AppPagesEnum.OrderList);
      });
    }
  }

  return (
    <div className="OrderPage">
      <div className="OrderPage-timeline">
        <h6>Timeline</h6>

        <br />

        <Timeline align="alternate">
          {statusList.map((item, index) => {
            const active = index <= currentStatusIndex;
            return (
              <TimelineItem key={item.id}>
                <TimelineSeparator>
                  <TimelineDot
                    color={active ? 'primary' : 'grey'}
                    variant={active ? 'default' : 'outlined'}
                  />
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>{item.label}</TimelineContent>
              </TimelineItem>
            );
          })}
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot
                color={order.status === OrderStatus.Canceled ? 'secondary' : 'grey'}
                variant="default"
              />
            </TimelineSeparator>
            <TimelineContent>Canceled</TimelineContent>
          </TimelineItem>
        </Timeline>
      </div>
      <div className="OrderPage-order-data">
        <h6>Order ID: #{order?.id}</h6>
        <p>Date: {order && formatDate(order?.createdAt)}</p>
        <p>Total: ${order?.totalAmount}</p>
        <p>Restaurant: {order?.restaurant?.name}</p>
        <p>Status: {order?.status}</p>

        <br />

        <div className="order-execute-container">
          {!!executeOrderButtonLabel.length && executeOrderButtonVisible && (
            <button type="button" className="btn btn-dark" onClick={executeOrder}>
              {executeOrderButtonLabel}
            </button>
          )}

          {cancelOrderButtonVisible && (
            <button type="button" className="btn btn-danger" onClick={cancelOrder}>
              Cancel Order
            </button>
          )}
        </div>

        <table>
          <thead>
            <tr>
              <th>Item Description</th>
              <th>Amount</th>
              <th>Unit price</th>
            </tr>
          </thead>
          <tbody>
            {order?.orderItems?.map((orderItem) => (
              <tr key={orderItem.id}>
                <td>{orderItem.meal?.name}</td>
                <td>{orderItem.amount}</td>
                <td>${orderItem.meal?.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
