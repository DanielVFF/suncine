import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import swagger from "@fastify/swagger"
import swaggerUi from "@fastify/swagger-ui"
import { AppModule } from './app/app.module';
import * as path from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
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

  try {
    // Start the application
    const port = 3000;
    await app.listen(port, '0.0.0.0');
  } catch (error) {
    console.error('Error during startup:', error);
    process.exit(1);
  }
}

bootstrap();
