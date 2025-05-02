import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from 'src/types/roles.decorator';
import { UserRole } from 'src/types/user-role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // If no roles are required, allow access
    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    
    console.log('Request user:', request.user);

    if (!request.user) {
      throw new UnauthorizedException('Authentication required');
    }

    const { utype } = request.user;

    if (!utype) {
      throw new UnauthorizedException('User role not found');
    }

    const hasRole = requiredRoles.includes(utype as UserRole);
    
    console.log('Role check:', {
      userRole: utype,
      requiredRoles,
      hasRole
    });

    return hasRole;
  }
}