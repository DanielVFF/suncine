import { Injectable } from '@nestjs/common';
import { EnvironmentConfigService } from 'src/infra/enviroment-config/environment-config.service';
import { HttpService } from 'src/infra/http/http.service';

@Injectable()
export class TmdbService {
  private readonly baseUrl = 'https://api.themoviedb.org/3';
  private readonly apiKey: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly environmentConfigService: EnvironmentConfigService,
  ) {
    this.apiKey = this.environmentConfigService.getTmdbApiKey();
  }

  async getPopularMovies(timeWindow: 'day' | 'week'): Promise<any> {
    const url = `${this.baseUrl}/trending/movie/${timeWindow}`;
    return this.httpService.get(url, {
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
      },
      params: {
        language: 'pt-BR',
      },
    });
  }
}
