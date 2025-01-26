import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { AuthService } from 'src/app/auth/auth.service';
import { SecretService } from '../secrets/secrets.service';
import { EnvironmentConfigService } from '../enviroment-config/environment-config.service';
import { UserData } from '../db/models/user.model';
import { TmdbService } from 'src/app/tmdb/tmdb.service';
import { MovieRepository } from '../db/repositories/movie.repository';

@Injectable()
export class SeedService implements OnApplicationBootstrap {
  constructor(
    private readonly authService: AuthService,
    private readonly secretService: SecretService,
    private readonly environmentService: EnvironmentConfigService,
    private readonly tmdbService: TmdbService,
    private readonly movieRepository: MovieRepository
  ) { }

  async onApplicationBootstrap() {
    await this.seed();
  }

  private async seed() {
    await this.firstUserSeed()
    await this.seedTrendingMovies('week')
  }

  private async firstUserSeed() {
    const { hash, salt } = await this.secretService.encrypt(
      this.environmentService.getPepper(),
      this.environmentService.getUserPass()
    )
    const user_raw: Omit<UserData, "id"> = {
      login: this.environmentService.getUserLogin(),
      password: hash,
      salt: salt,
      name: "Dev"
    }
    this.authService.fetchByLoginOrCreate(user_raw)
    console.info(`firstUserSeed executed`)
  }

  private async seedTrendingMovies(timeWindow: 'day' | 'week'): Promise<void> {

    const response = await this.tmdbService.getPopularMovies(timeWindow)

    const movies = response.results;

    for (const movie of movies) {
      const existingMovie = await this.movieRepository.findOneByTmdbId(movie.id);

      if (existingMovie) {
        continue;
      }
      await this.movieRepository.create({
        tmdb_id: movie.id,
        title: movie.title,
        original_title: movie.original_title,
        backdrop_path: movie.backdrop_path,
        poster_path: movie.poster_path,
        release_date: movie.release_date ? new Date(movie.release_date) : undefined,
        overview: movie.overview,
      });
    }
    console.info(`seedTrendingMovies executed`)
  }
}
