import { Global, Module } from '@nestjs/common';
import { EnvironmentConfigService } from './environment-config.service';
import { ConfigService } from '@nestjs/config';

// Should be defined as global in order to use inside modules
@Global()
@Module({
  providers: [EnvironmentConfigService, ConfigService],
  exports: [EnvironmentConfigService],
})
export class EnvironmentConfigModule {}
