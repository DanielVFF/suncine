import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import mongoose from 'mongoose';
import { RunSeed } from './infra/seed/';
import { DB } from './infra/db';
import { AppModule } from './app/app.module';
import { EnvironmentConfigService } from './infra/enviroment-config/environment-config.service';

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
  const config = new DocumentBuilder()
    .setTitle('SunCine API')
    .setDescription('API documentation for SunCine')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/docs', app, document, {
    swaggerOptions: {
      docExpansion: 'none',
      deepLinking: false,
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
