import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HistoryService } from 'components/history/history.service';
import { OrderItem } from 'components/order-item/order-item.entity';
import { OrderItemService } from 'components/order-item/order-item.service';
import { RestaurantService } from 'components/restaurant/restaurant.service';
import { User } from 'components/user/user.entity';
import { UserService } from 'components/user/user.service';
import { GenericService } from 'generics/generic.service';
import { Repository } from 'typeorm';

import { Order, OrderStatus } from './order.entity';

@Injectable()
export class OrderService extends GenericService<Order> {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private readonly historyService: HistoryService,
    private readonly restaurantService: RestaurantService,
    private readonly orderItemService: OrderItemService,
    private readonly userService: UserService
  ) {
    super(orderRepository);
  }

  one(orderId: number) {
    return this.orderRepository.findOne({
      where: { id: orderId },
      relations: ['user', 'restaurant', 'orderItems', 'orderItems.meal', 'history']
    });
  }

  async allByRestaurant(user: User) {
    const restaurant = await this.restaurantService.oneByUser(user);

    return this.orderRepository.find({
      where: { restaurant },
      relations: ['user', 'restaurant', 'orderItems', 'orderItems.meal', 'history']
    });
  }

  allByUser(user: User) {
    return this.orderRepository.find({
      where: { user },
      relations: ['user', 'restaurant', 'orderItems', 'orderItems.meal', 'history']
    });
  }

  async createOrder(user: User, restaurantId: number, orderItems: OrderItem[]) {
    const totalAmount = orderItems
      .map((orderItem) => orderItem.amount * orderItem.meal.price)
      .reduce((prev, curr) => prev + curr);

    const restaurant = await this.restaurantService.findOne(restaurantId);

    const order = await this.orderRepository.create({
      user,
      restaurant,
      totalAmount,
      status: OrderStatus.Placed
    });

    await this.orderRepository.save(order);

    this.createHistory(order.id, OrderStatus.Placed);

    await this.orderItemService.createFromList(order, orderItems);

    return this.orderRepository.find({
      where: { id: order.id },
      relations: ['user', 'restaurant', 'orderItems', 'orderItems.meal', 'history']
    });
  }

  async createHistory(orderId: number, status: OrderStatus) {
    const order = await this.orderRepository.findOne(orderId);
    order.status = status;
    this.orderRepository.save(order);

    this.historyService.createNew(order, status);
  }

  cancel(orderId: number) {
    const newStatus = OrderStatus.Canceled;
    this.createHistory(orderId, newStatus);
  }

  process(orderId: number) {
    const newStatus = OrderStatus.Processing;
    this.createHistory(orderId, newStatus);
  }

  delivery(orderId: number) {
    const newStatus = OrderStatus.InRoute;
    this.createHistory(orderId, newStatus);
  }

  delivered(orderId: number) {
    const newStatus = OrderStatus.Delivered;
    this.createHistory(orderId, newStatus);
  }

  received(orderId: number) {
    const newStatus = OrderStatus.Received;
    this.createHistory(orderId, newStatus);
  }

  async restaurantClients(user: User) {
    const restaurant = await this.restaurantService.oneByUser(user);
    const orders = await this.orderRepository.find({
      where: { restaurant },
      relations: ['user']
    });

    return orders.map((order) => order.user);
  }
}
