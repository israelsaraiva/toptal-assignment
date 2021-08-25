import { ApiProperty } from '@nestjs/swagger';
import { FoodCategory } from 'components/food-category/food-category.entity';
import { OrderItem } from 'components/order-item/order-item.entity';
import { Restaurant } from 'components/restaurant/restaurant.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Meal {
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
  @Column('decimal', { precision: 8, scale: 2 })
  price: number;

  @ApiProperty()
  @ManyToOne(() => FoodCategory, (foodCategory) => foodCategory.meal, { onDelete: 'CASCADE' })
  foodCategory: FoodCategory;

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.meals)
  restaurant: Restaurant;

  @ApiProperty()
  @OneToMany(() => OrderItem, (orderItem) => orderItem.meal, { onDelete: 'CASCADE' })
  orderItems: OrderItem[];
}
