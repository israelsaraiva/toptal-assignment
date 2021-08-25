import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'auth/enums/role.enum';
import { Repository, UpdateResult } from 'typeorm';

import { GenericService } from '../../generics/generic.service';
import { User } from './user.entity';

@Injectable()
export class UserService extends GenericService<User> {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {
    super(userRepository);
  }

  async findByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ email });
  }

  async create(newUser: User): Promise<User> {
    const isUserExist = await this.findByEmail(newUser.email);

    if (isUserExist) {
      throw new BadRequestException('Account already exists.');
    }

    const userEntity = Object.assign(new User(), newUser);

    const allowedRegisterRoles = [Role.RestaurantOwner, Role.User];

    userEntity.roles = allowedRegisterRoles.some((role) => userEntity.roles.includes(role))
      ? userEntity.roles
      : [Role.User];

    const user = await this.userRepository.save(userEntity);

    return user;
  }

  async update(id: number, user: User): Promise<UpdateResult> {
    const allowedRegisterRoles = [Role.RestaurantOwner, Role.User];

    const roles = allowedRegisterRoles.some((role) => user.roles.includes(role))
      ? user.roles
      : [Role.User];

    return this.userRepository.update(id, { ...user, roles });
  }
}
