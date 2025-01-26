import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import { User } from 'src/interfaces/user/user.interface';
import { JwtService } from '../jwt/jwt.service';
import { EnvironmentConfigService } from '../enviroment-config/environment-config.service';
import { CustomFastifyRequest } from 'src/interfaces/config/custom-fastify-request.interface';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwt: JwtService, private readonly environmentConfigService: EnvironmentConfigService) { }

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<FastifyRequest>();

    const tokenBearered = request.headers.authorization;
    if (!tokenBearered) {
      throw new UnauthorizedException('Authorization header missing');
    }

    const [, token] = tokenBearered.split(' ');
    const { status, payload } = this.jwt.verify<User>(token, this.environmentConfigService.getJwtToken());

    if (status === 'INVALID' && payload == undefined) {
      throw new UnauthorizedException('Invalid token');
    }
    (request as CustomFastifyRequest).user = payload as User;
    return true;

  }
}
