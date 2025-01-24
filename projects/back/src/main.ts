import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import mongoose from 'mongoose';
import { DB } from './infra/db';
import swagger from "@fastify/swagger"
import swaggerUi from "@fastify/swagger-ui"
import { AppModule } from './app/app.module';
import { EnvironmentConfigService } from './infra/enviroment-config/environment-config.service';
import * as path from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true })
  );

  // Retrieve enviroment service
  const configService = app.get(EnvironmentConfigService);


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
    // Connect to MongoDB
    await mongoose.connect(
      configService.getMongoUrl()
    );
    console.info('Mongo connected!');

    // Run database seed
    await RunSeed(DB());

    // Start the application
    const port = 3000;
    await app.listen(port, '0.0.0.0');
    console.info("+++++++++++")
    console.info(`Server running on port: ${port}`);
    console.info(`Swagger docs available at http://localhost:${port}/docs`);
    console.info("+++++++++++")
  } catch (error) {
    console.error('Error during startup:', error);
    process.exit(1);
  }
}

bootstrap();
