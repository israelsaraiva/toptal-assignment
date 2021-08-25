import { ApiProperty } from '@nestjs/swagger';
import { Order, OrderStatus } from 'components/order/order.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class History {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @ManyToOne(() => Order, (order) => order.history, { onDelete: 'CASCADE' })
  order: Order;

  @ApiProperty()
  @Column('text')
  status: OrderStatus;

  @CreateDateColumn()
  createdAt: Date;
}
