import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EnvironmentConfigModule } from 'src/infra/enviroment-config/environment-config.module';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { EnvironmentConfigService } from 'src/infra/enviroment-config/environment-config.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { SeedModule } from 'src/infra/seed/seed.module';
import { TmdbModule } from './tmdb/tmdb.module';
import { MovieModule } from './movie/movie.module';
import { LoggerModule } from 'src/infra/logger/logger.module';

@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot({ isGlobal: true }),
    EnvironmentConfigModule,
    MongooseModule.forRootAsync({
      imports: [EnvironmentConfigModule, ConfigModule],
      useFactory: (configService: EnvironmentConfigService) => ({
        uri: configService.getMongoUrl(),
      }),
      inject: [EnvironmentConfigService],
    }),
    AuthModule,
    SeedModule,
    TmdbModule,
    MovieModule,
    LoggerModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
