import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EnvironmentConfigService {
  constructor(private configService: ConfigService) {}

  // Como não usamos as variaveis de conexão separadamente faz mais sentido separar assim, e podemos ajustar erros de conexão pelo env
  getMongoUrl(): string {
    const dbHost = this.configService.get<string>('MONGO_URL');
    if (!dbHost) {
      throw new Error('MONGO_URL não está definido no .env');
    }
    return dbHost;
  }
}
