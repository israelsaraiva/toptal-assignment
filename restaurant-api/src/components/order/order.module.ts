import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistoryModule } from 'components/history/history.module';
import { OrderItemModule } from 'components/order-item/order-item.module';
import { RestaurantModule } from 'components/restaurant/restaurant.module';
import { UserModule } from 'components/user/user.module';

import { OrderController } from './order.controller';
import { Order } from './order.entity';
import { OrderService } from './order.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order]),
    UserModule,
    HistoryModule,
    RestaurantModule,
    OrderItemModule
  ],
  providers: [OrderService],
  controllers: [OrderController],
  exports: [OrderService]
})
export class OrderModule {}
