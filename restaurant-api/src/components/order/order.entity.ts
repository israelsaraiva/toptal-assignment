import { ApiProperty } from '@nestjs/swagger';
import { History } from 'components/history/history.entity';
import { OrderItem } from 'components/order-item/order-item.entity';
import { Restaurant } from 'components/restaurant/restaurant.entity';
import { User } from 'components/user/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';

export enum OrderStatus {
  Placed = 'placed',
  Canceled = 'canceled',
  Processing = 'processing',
  InRoute = 'inRoute',
  Delivered = 'delivered',
  Received = 'received'
}

@Entity()
export class Order {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @OneToMany(() => OrderItem, (orderItem) => orderItem.order, { onDelete: 'CASCADE' })
  orderItems: OrderItem[];

  @ApiProperty()
  @Column('decimal', { precision: 8, scale: 2 })
  totalAmount: number;

  @ApiProperty()
  @Column('text')
  status: OrderStatus;

  @ApiProperty()
  @OneToMany(() => History, (history) => history.order, { onDelete: 'CASCADE' })
  history: History[];

  @ApiProperty()
  @ManyToOne(() => User, (user) => user.orders, { onDelete: 'CASCADE' })
  user: User;

  @ApiProperty()
  @ManyToOne(() => Restaurant, (restaurant) => restaurant.orders, { onDelete: 'CASCADE' })
  restaurant: Restaurant;

  @CreateDateColumn()
  createdAt: Date;
}
