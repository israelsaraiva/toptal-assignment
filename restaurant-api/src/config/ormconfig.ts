import { FoodCategory } from 'components/food-category/food-category.entity';
import { History } from 'components/history/history.entity';
import { Meal } from 'components/meal/meal.entity';
import { OrderItem } from 'components/order-item/order-item.entity';
import { Order } from 'components/order/order.entity';
import { Restaurant } from 'components/restaurant/restaurant.entity';
import { User } from 'components/user/user.entity';
import { join } from 'path';
import { ConnectionOptions } from 'typeorm';

const ormConfig: ConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  database: process.env.DATABASE_NAME,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  entities: [FoodCategory, History, Meal, Order, OrderItem, Restaurant, User],
  migrationsTableName: 'migrations',
  migrations: [join(__dirname, '../migrations/**/*{.ts,.js}')],
  cli: {
    migrationsDir: 'src/migrations'
  },
  synchronize: false,
  dropSchema: false,
  migrationsRun: false,
  logging: ['warn', 'error']
};

export default ormConfig;
