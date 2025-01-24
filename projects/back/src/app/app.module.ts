import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EnvironmentConfigModule } from 'src/infra/enviroment-config/environment-config.module';

@Module({
  imports: [
    EnvironmentConfigModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
