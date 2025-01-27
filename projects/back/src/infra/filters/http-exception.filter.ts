import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { FastifyReply } from 'fastify';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();
    const status = exception.getStatus();

    const exceptionResponse: any = exception.getResponse();
    const message = exceptionResponse

    const statusMap = {
      400: "BAD REQUEST",
      401: "UNAUTHORIZED",
      404: "NOT FOUND",
      500: 'ERROR',
    };

    const responseFormated : {status: string, message?: string} = {
      status: statusMap[status] ?? status,
    }

    if(message && typeof message == 'string') responseFormated.message = message
    else if(message.message) responseFormated.message = message.message

    response.status(status).send(responseFormated);
  }
}
