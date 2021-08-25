import OrderListPage from 'pages/order-list/OrderListPage';
import OrderPlacedPage from 'pages/order-placed/OrderPlacedPage';
import OrderPage from 'pages/order/OrderPage';
import RestaurantMealPage from 'pages/restaurant-meal/RestaurantMealPage';
import MyRestaurantPage from 'pages/restaurant/MyRestaurantPage';

import AppPagesEnum from '../pages/pages.enum';
import RestaurantsPage from '../pages/restaurants/RestaurantsPage';
import { configRoutes, RouteConfig } from './config.routes';

const routes: RouteConfig[] = [
  { path: AppPagesEnum.Restaurants, component: RestaurantsPage },
  { path: AppPagesEnum.RestaurantMeals, component: RestaurantMealPage },
  { path: AppPagesEnum.OrderPlaced, component: OrderPlacedPage },
  { path: AppPagesEnum.Order, component: OrderPage },
  { path: AppPagesEnum.OrderList, component: OrderListPage },
  { path: AppPagesEnum.MyRestaurant, component: MyRestaurantPage }
];

const AppRoutes = () => configRoutes(routes, false);

export default AppRoutes;
