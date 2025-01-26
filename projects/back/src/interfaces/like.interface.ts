import { DeleteResult } from 'mongoose';
import { Like } from 'src/infra/db/models/like.model';
import { MovieResult } from 'src/interfaces/movie.interface';

export interface ILikeRepository {
  create(userId: string, movieId: string): Promise<Like>;
  findByMovieAndUserId(userId: string, movieId: string): Promise<Like | null>;
  findAll(): Promise<Like[]>;
  deleteByMovieAndUserId(userId: string, movieId: string): Promise<DeleteResult>;
  countLikesByMovieId(movieId: string): Promise<number>;
  findByUserId(userId: string): Promise<Like[]>;
  findTrendedMovies(limit : number): Promise<MovieResult[]>;
}
