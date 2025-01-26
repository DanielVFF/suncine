import { FastifyRequest } from 'fastify';
import { User } from 'src/interfaces/user/user.interface';

export interface CustomFastifyRequest extends FastifyRequest {
  user: User;
}
