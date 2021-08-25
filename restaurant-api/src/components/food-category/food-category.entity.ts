import { ApiProperty } from '@nestjs/swagger';
import { Meal } from 'components/meal/meal.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class FoodCategory {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @OneToMany(() => Meal, (meal) => meal.foodCategory, { onDelete: 'CASCADE' })
  meal: Meal;
}
