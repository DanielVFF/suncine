import {
    ExceptionFilter,
    Catch,
    HttpException,
    InternalServerErrorException,
} from '@nestjs/common';
import { LoggerService } from '../logger/logger.service';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    constructor(private readonly logger: LoggerService) { }

    catch(exception: any) {

        const message =
            exception instanceof HttpException
                ? exception.getResponse()
                : exception.message;

        this.logger.error(`Error: ${message}`, exception.stack);
        throw new InternalServerErrorException()
    }
}
