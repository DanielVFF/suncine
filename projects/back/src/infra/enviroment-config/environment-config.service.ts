import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IEnvironmentConfigService } from 'src/interfaces/config/environment-config.interface';

@Injectable()
export class EnvironmentConfigService implements IEnvironmentConfigService {
  constructor(private configService: ConfigService) {}

  getTemplate(variableName: string): string {
    const dbHost = this.configService.get<string>(variableName);
    if (!dbHost) {
      throw new Error(`${variableName} não está definido no .env`);
    }
    return dbHost;
  }

  getMongoUrl(): string {
    return this.getTemplate('MONGO_URL');
  }

  getPepper(): string {
    return this.getTemplate('PEPPER');
  }

  getUserLogin(): string {
    return this.getTemplate('DEFAULT_USER_LOGIN');
  }
  getUserPass(): string {
    return this.getTemplate('DEFAULT_USER_PASS');
  }

  getTmdbApiKey(): string {
    return this.getTemplate('TMDB_API_KEY');
  }

  getJwtToken(): string {
    return this.getTemplate('JWT_TOKEN');
  }
}
