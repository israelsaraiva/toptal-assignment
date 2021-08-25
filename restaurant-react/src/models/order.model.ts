import { OrderItem } from './order-item.model';
import { Restaurant } from './restaurant.model';

export enum OrderStatus {
  Placed = 'placed',
  Canceled = 'canceled',
  Processing = 'processing',
  InRoute = 'inRoute',
  Delivered = 'delivered',
  Received = 'received'
}

export const OrderStatusFlow = [
  OrderStatus.Placed,
  OrderStatus.Processing,
  OrderStatus.InRoute,
  OrderStatus.Delivered,
  OrderStatus.Received,
  OrderStatus.Canceled
];

export interface Order {
  id: number;
  orderItems: OrderItem[];
  date: Date;
  totalAmount: number;
  status: OrderStatus;
  restaurant: Restaurant;
  createdAt: Date;
  restaurantId: number;
}
