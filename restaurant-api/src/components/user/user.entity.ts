import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'auth/enums/role.enum';
import { Order } from 'components/order/order.entity';
import { Restaurant } from 'components/restaurant/restaurant.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn
} from 'typeorm';
import { hashPassword } from 'utils/functions';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @BeforeInsert()
  applyPasswordHashing() {
    this.password = hashPassword(this.password);
  }

  @Column('text')
  roles: Role[];

  @BeforeInsert()
  setDefaultRole() {
    this.roles = this.roles ?? [Role.User];
  }

  @ApiProperty()
  @OneToMany(() => Order, (order) => order.user, { onDelete: 'CASCADE' })
  orders: Order[];
}
