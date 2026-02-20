import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, ForbiddenException } from '@nestjs/common';
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
        const authHeader = request.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new UnauthorizedException('Token de autorización (Bearer) no proporcionado');
        }

        const token = authHeader.split(' ')[1];

        let userRole = 'guest';
        if (token === 'admin-secret-token-123') {
            userRole = 'admin';
        } else if (token === 'user-secret-token-456') {
            userRole = 'user';
        } else {
            throw new UnauthorizedException('Token inválido o expirado');
        }

        const hasRole = requiredRoles.includes(userRole);
        if (!hasRole) {
            throw new ForbiddenException(`No tienes permisos suficientes. Requerido: ${requiredRoles.join(', ')}`);
        }

        return true;
    }
}