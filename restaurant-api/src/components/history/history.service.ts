import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order, OrderStatus } from 'components/order/order.entity';
import { Repository } from 'typeorm';

import { History } from './history.entity';

@Injectable()
export class HistoryService {
  constructor(
    @InjectRepository(History)
    private readonly historyRepository: Repository<History>
  ) {}

  createNew(order: Order, status: OrderStatus) {
    return this.historyRepository.insert({ order, status });
  }
}
