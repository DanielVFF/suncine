import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EnvironmentConfigService // implements
{
  constructor(private configService: ConfigService) {}

  getMongoUrl(): string {
    const dbHost = this.configService.get<string>('MONGO_URL');
    if (!dbHost) {
      throw new Error('MONGO_URL não está definido no .env');
    }
    return dbHost;
  }

  getPepper(): string {
    const dbHost = this.configService.get<string>('PEPPER');
    if (!dbHost) {
      throw new Error('PEPPER is not defined in .env file');
    }
    return dbHost;
  }

  getUserLogin(): string {
    const dbHost = this.configService.get<string>('DEFAULT_USER_LOGIN');
    if (!dbHost) {
      throw new Error('DEFAULT_USER_LOGIN is not defined in .env file');
    }
    return dbHost;
  }
  getUserPass(): string {
    const dbHost = this.configService.get<string>('DEFAULT_USER_PASS');
    if (!dbHost) {
      throw new Error('DEFAULT_USER_PASS is not defined in .env file');
    }
    return dbHost;
  }
}
