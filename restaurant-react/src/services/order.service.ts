import { OrderItem } from 'models/order-item.model';
import { Order, OrderStatus } from 'models/order.model';
import { User } from 'models/user.model';
import { Role, useAuth } from 'providers/auth.provider';

import useHttpService from './http.service';

export default function useOrderService() {
  const url = 'order';

  const { currentUser } = useAuth();
  const { instance, ...genericFunctions } = useHttpService<Order>(url);

  function all() {
    const secondaryUrl = currentUser?.roles.includes(Role.RestaurantOwner)
      ? 'all-by-restaurant'
      : 'all-by-user';
    return instance.get<Order[]>(`${url}/${secondaryUrl}`);
  }

  function create(restaurantId: number, orderItems: OrderItem[]) {
    return instance.post<Order>(`${url}/create-new/${restaurantId}`, { orderItems });
  }

  function cancel(orderId: number) {
    return instance.post<void>(`${url}/cancel/${orderId}`, {});
  }

  function getSecondaryUrlForExecuteOrder(status: OrderStatus) {
    switch (status) {
      case OrderStatus.Placed:
        return 'process';

      case OrderStatus.Processing:
        return 'delivery';

      case OrderStatus.InRoute:
        return 'delivered';

      case OrderStatus.Delivered:
        return 'received';

      default:
        return '';
    }
  }

  function executeOrder(order: Order) {
    const secondaryUrl = getSecondaryUrlForExecuteOrder(order.status);
    return instance.post<void>(`${url}/${secondaryUrl}/${order.id}`, {});
  }

  function restaurantClients() {
    return instance.get<User[]>(`${url}/restaurant-clients`);
  }

  return {
    ...genericFunctions,
    all,
    create,
    cancel,
    process,
    executeOrder,
    restaurantClients
  };
}
