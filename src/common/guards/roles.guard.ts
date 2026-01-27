import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        if (!requiredRoles) {
            return true;
        }

        const request = context.switchToHttp().getRequest();

        const userRole = request.headers['x-role'];

        if (!userRole) {
            throw new UnauthorizedException('Debes enviar el header "x-role"');
        }

        const hasRole = requiredRoles.includes(userRole);

        if (!hasRole) {
            throw new UnauthorizedException('No tienes permisos suficientes (Role requerido: admin)');
        }

        return true;
    }
}