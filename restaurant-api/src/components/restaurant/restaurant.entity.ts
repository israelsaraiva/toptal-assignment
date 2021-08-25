import { ApiProperty } from '@nestjs/swagger';
import { FoodCategory } from 'components/food-category/food-category.entity';
import { Meal } from 'components/meal/meal.entity';
import { Order } from 'components/order/order.entity';
import { User } from 'components/user/user.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn
} from 'typeorm';

@Entity()
export class Restaurant {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column()
  description: string;

  @ApiProperty()
  @OneToMany(() => Meal, (meal) => meal.restaurant, { onDelete: 'CASCADE' })
  meals: Meal[];

  @ApiProperty()
  @OneToMany(() => Order, (order) => order.restaurant, { onDelete: 'CASCADE' })
  orders: Order[];

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @Column({ nullable: true })
  blockUsers?: string;

  @BeforeInsert()
  setDefaultRole() {
    this.blockUsers = '[]';
  }
}
