import { Movie } from 'src/infra/db/models/movie.model';

export interface MovieResult extends Movie {
  likes?: number;
  user_liked?: boolean;
}

export interface IMovieRepository {
  create(movie: Partial<Movie>): Promise<Movie>;
  findOneByTmdbId(tmdb_id: number): Promise<Movie | null>;
  findAll(): Promise<Movie[]>;
  findById(id: Movie | string): Promise<Movie | null>;
  searchByTitle(title: string): Promise<Movie[]>;
}
