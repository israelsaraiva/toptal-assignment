import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from 'auth/enums/role.enum';
import { ROLES_KEY } from 'auth/roles/roles.decorator';
import { UserService } from 'components/user/user.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass()
    ]);

    if (!requiredRoles) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();

    if (user) {
      const userData = await this.userService.findOne(Number(user?.id || 0));
      return requiredRoles.some((role) => userData?.roles?.includes(role));
    }

    return false;
  }
}
