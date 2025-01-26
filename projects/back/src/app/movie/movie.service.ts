import { Injectable, NotFoundException } from '@nestjs/common';
import { DeleteResult } from 'mongoose';
import { Like } from 'src/infra/db/models/like.model';
import { LikeRepository } from 'src/infra/db/repositories/like.repository';
import { MovieRepository } from 'src/infra/db/repositories/movie.repository';
import { MovieResult } from 'src/interfaces/movie.interface';

@Injectable()
export class MovieService {
    constructor(
        private readonly movieRepository: MovieRepository,
        private readonly likeRepository: LikeRepository
    ) { }

    async mostTrended(userId: string) {
        const movies: MovieResult[] = await this.movieRepository.findAll()
        for (const movie of movies) {
            movie.likes = await this.likeRepository.countLikesByMovieId(movie.id)
            movie.user_liked = !!(await this.likeRepository.findByMovieAndUserId(userId, movie.id))
        }
        return movies
    }

    async top10Movies(userId: string) {
        const movies: MovieResult[] = await this.likeRepository.findTop10Movies()
        for (const movie of movies) {
            movie.user_liked = !!(await this.likeRepository.findByMovieAndUserId(userId, movie.id))
        }
        return movies
    }

    async likedMovies(userId: string) {
        const likes: Like[] = await this.likeRepository.findByUserId(userId)
        const movies: MovieResult[] = []
        for (const like of likes) {
            const movie: MovieResult | null = await this.movieRepository.findById(like.movie)
            if (movie) {
                movie.likes = await this.likeRepository.countLikesByMovieId(movie.id)
                movie.user_liked = !!(await this.likeRepository.findByMovieAndUserId(userId, movie.id))
                movies.push(movie)
            }
        }
        return movies
    }

    async likeOrUnlikeMovie(userId: string, movieId: string): Promise<{ status: 'LIKE' | 'DISLIKE' }> {
        const movieExists = !!(await this.movieRepository.findById(movieId))
        if (!movieExists) {
            throw new NotFoundException('Movie does not Exists')
        }

        const likeExists = !!(await this.likeRepository.findByMovieAndUserId(userId, movieId))
        let status: 'LIKE' | 'DISLIKE'
        if (likeExists) {
            await this.likeRepository.deleteByMovieAndUserId(userId, movieId)
            status = 'DISLIKE'
        } else {
            await this.likeRepository.create(userId, movieId)
            status = 'LIKE'
        }
        return { status }
    }
}
