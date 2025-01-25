import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import { ENV_VAR } from '../../../env';
import { User } from 'src/interfaces/user/user.interface';
import { JwtService } from '../jwt/jwt.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwt : JwtService){} 

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<FastifyRequest>();

    const tokenBearered = request.headers.authorization;
    if (!tokenBearered) {
      throw new UnauthorizedException('Authorization header missing');
    }

    const [, token] = tokenBearered.split(' ');
    const { status, payload } = this.jwt.verify<User>(token, ENV_VAR.JWT_TOKEN);

    if (status === 'INVALID') {
      throw new UnauthorizedException('Invalid token');
    }

    (request as any).user = payload;
    return true;
  }
}
