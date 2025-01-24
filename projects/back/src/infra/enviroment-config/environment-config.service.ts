import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
// import { EnvironmentConfigInterface } from 'src/interfaces/enviroment-config.interface';

// TMDB_TOKEN=
// PEPPER=changeToStrongPepper
// JWT_TOKEN=changeRoStrongJwtToken

// MONGO_HOST=127.0.0.1
// MONGO_PORT=27017
// MONGO_DB_NAME=Suncine
// MONGO_LOGIN=root
// MONGO_PASS=troqueASenha

// DEFAULT_USER_LOGIN=admin@email.com
// DEFAULT_USER_PASS=Admin@123



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
