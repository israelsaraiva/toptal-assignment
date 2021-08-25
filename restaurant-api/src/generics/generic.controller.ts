import { Body, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { Role } from 'auth/enums/role.enum';
import { JwtAuthGuard } from 'auth/guards/jwt-auth.guard';
import { RolesGuard } from 'auth/guards/roles.guard';
import { Roles } from 'auth/roles/roles.decorator';

import { GenericService } from './generic.service';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.Admin)
export abstract class GenericController<T> {
  constructor(private readonly service: GenericService<T>) {}

  @Get('all')
  all(): Promise<T[]> {
    return this.service.findAll();
  }

  @Get('one/:id')
  one(@Param('id') id: string): Promise<T> {
    return this.service.findOne(Number(id));
  }

  @Post('create')
  create(@Body() data: T) {
    return this.service.create(data);
  }

  @Put('update/:id')
  update(@Param('id') id: string, @Body() data: T) {
    return this.service.update(Number(id), data);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.service.remove(Number(id));
  }
}
