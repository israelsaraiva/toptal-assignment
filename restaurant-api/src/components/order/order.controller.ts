import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Role } from 'auth/enums/role.enum';
import { Roles } from 'auth/roles/roles.decorator';
import { OrderItem } from 'components/order-item/order-item.entity';
import { GenericController } from 'generics/generic.controller';
import { IAuthInfoRequest } from 'models/auth-info-request';

import { Order } from './order.entity';
import { OrderService } from './order.service';

type CreateOrderParams = {
  orderItems: OrderItem[];
};

@ApiTags('orders')
@Controller('order')
export class OrderController extends GenericController<Order> {
  constructor(private readonly orderService: OrderService) {
    super(orderService);
  }

  @Roles(Role.Admin, Role.RestaurantOwner, Role.User)
  @Get('one/:id')
  one(@Param('id') id: string): Promise<Order> {
    return this.orderService.findOne(Number(id));
  }

  @Roles(Role.Admin, Role.RestaurantOwner)
  @Get('all-by-restaurant/')
  allByRestaurant(@Req() request: IAuthInfoRequest) {
    return this.orderService.allByRestaurant(request.user);
  }

  @Roles(Role.Admin, Role.User)
  @Get('all-by-user/')
  allByUser(@Req() request: IAuthInfoRequest) {
    return this.orderService.allByUser(request.user);
  }

  @Roles(Role.Admin, Role.User)
  @Post('create-new/:restaurantId')
  createNew(
    @Req() request: IAuthInfoRequest,
    @Param('restaurantId') restaurantId: string,
    @Body() { orderItems }: CreateOrderParams
  ) {
    return this.orderService.createOrder(request.user, Number(restaurantId), orderItems);
  }

  @Roles(Role.Admin, Role.User, Role.RestaurantOwner)
  @Post('cancel/:orderId')
  cancel(@Param('orderId') orderId: string) {
    return this.orderService.cancel(Number(orderId));
  }

  @Roles(Role.Admin, Role.RestaurantOwner)
  @Post('process/:orderId')
  process(@Param('orderId') orderId: string) {
    return this.orderService.process(Number(orderId));
  }

  @Roles(Role.Admin, Role.RestaurantOwner)
  @Post('delivery/:orderId')
  delivery(@Param('orderId') orderId: string) {
    return this.orderService.delivery(Number(orderId));
  }

  @Roles(Role.Admin, Role.RestaurantOwner)
  @Post('delivered/:orderId')
  delivered(@Param('orderId') orderId: string) {
    return this.orderService.delivered(Number(orderId));
  }

  @Roles(Role.Admin, Role.User)
  @Post('received/:orderId')
  received(@Param('orderId') orderId: string) {
    return this.orderService.received(Number(orderId));
  }

  @Roles(Role.Admin, Role.RestaurantOwner)
  @Get('restaurant-clients')
  restaurantClients(@Req() { user }: IAuthInfoRequest) {
    return this.orderService.restaurantClients(user);
  }
}
