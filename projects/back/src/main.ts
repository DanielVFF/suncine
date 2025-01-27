import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import swagger from "@fastify/swagger"
import swaggerUi from "@fastify/swagger-ui"
import { AppModule } from './app/app.module';
import * as path from 'path';
import { HttpExceptionFilter } from './infra/filters/http-exception.filter';
import { CustomValidationPipe } from './infra/pipes/custom-validation.pipe';
import { LoggerService } from './infra/logger/logger.service';
import { AllExceptionsFilter } from './infra/filters/all-exception.filter';


async function bootstrap() {
  app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true })
  );

  // Configure CORS
  app.enableCors({ origin: '*' });

  // Configure Swagger
  app.register(swagger, {
    mode: 'static',
    specification: {
      path: path.join(__dirname, '..','..', 'openapi.yaml'),  
      baseDir: __dirname,
    },
  });
  app.register(swaggerUi, {
    routePrefix: '/docs',
    uiConfig: {
      docExpansion: 'none',
      deepLinking: false,
    },
    theme: {
      title: 'SunCine API Doc',
    },
  });

  // Configure Global pipes for dto validation
  app.useGlobalPipes(new CustomValidationPipe())

  //Configure custom logger service
  const logger = app.get(LoggerService);
  app.useGlobalFilters(new AllExceptionsFilter(logger));

  app.useLogger(logger)
  //Configure Global filters for http exceptions standarts
  app.useGlobalFilters(new HttpExceptionFilter());

  try {
    const port = 3000;
    await app.listen(port, '0.0.0.0');
  } catch (error) {
    console.error('Error during startup:', error);
    process.exit(1);
  }
}

bootstrap();
export let app;
