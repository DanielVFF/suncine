import { Module } from '@nestjs/common';
import { EnvironmentConfigService } from './';
import { SeedService } from './seed.service';

@Module({
      providers: [EnvironmentConfigService, SeedService],
      exports: []
})
export class SeedModule {

}
