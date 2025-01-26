import { Injectable } from '@nestjs/common';
import { DeleteResult } from 'mongoose';
import { Like } from 'src/infra/db/models/like.model';
import { LikeRepository } from 'src/infra/db/repositories/like.repository';
import { MovieRepository } from 'src/infra/db/repositories/movie.repository';
import { MovieResult } from 'src/interfaces/movie/movie.interface';

@Injectable()
export class MovieService {
    constructor(
        private readonly movieRepository: MovieRepository,
        private readonly likeRepository: LikeRepository
    ) { }

    async top10Movies(userId : string) {
        const movies: MovieResult[] = await this.likeRepository.findTop10Movies()
        for(const movie of movies){
            movie.user_liked = !!(await this.likeRepository.findByMovieAndUserId(userId,movie.id))
        }
        return movies
    }


    async mostTrended(userId : string) {
        const movies: MovieResult[] = await this.movieRepository.findAll()
        for (const movie of movies) {
           movie.likes = await this.likeRepository.countLikesByMovieId(movie.id)
           movie.user_liked = !!(await this.likeRepository.findByMovieAndUserId(userId, movie.id))
        }
        return movies
    }

    async likeOrUnlikeMovie(userId: string, movieId: string): Promise<Like | DeleteResult> {
        const likeExists = await this.likeRepository.findByMovieAndUserId(userId, movieId)
        console.log(likeExists, movieId, userId)
        if (likeExists) {
            return await this.likeRepository.deleteByMovieAndUserId(userId, movieId)
        } else {
            return await this.likeRepository.create(userId, movieId)
        }
    }
}
