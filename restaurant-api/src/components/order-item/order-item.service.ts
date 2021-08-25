import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'components/order/order.entity';
import { GenericService } from 'generics/generic.service';
import { Repository } from 'typeorm';

import { OrderItem } from './order-item.entity';

@Injectable()
export class OrderItemService extends GenericService<OrderItem> {
  constructor(
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>
  ) {
    super(orderItemRepository);
  }

  createFromList(order: Order, orderItems: OrderItem[]) {
    return Promise.all(
      orderItems.map((orderItem) => this.orderItemRepository.insert({ ...orderItem, order }))
    );
  }
}
