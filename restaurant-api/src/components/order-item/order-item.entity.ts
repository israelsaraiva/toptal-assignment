import { ApiProperty } from '@nestjs/swagger';
import { Meal } from 'components/meal/meal.entity';
import { Order } from 'components/order/order.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn
} from 'typeorm';

@Entity()
export class OrderItem {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  amount: number;

  @ApiProperty()
  @ManyToOne(() => Meal, (meal) => meal.orderItems, { onDelete: 'CASCADE' })
  meal: Meal;

  @ApiProperty()
  @ManyToOne(() => Order, (order) => order.orderItems, { onDelete: 'CASCADE' })
  order: Order;

  @CreateDateColumn()
  createdAt: Date;
}
