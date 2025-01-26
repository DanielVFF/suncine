import { Module } from '@nestjs/common';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';
import { MovieRepository } from 'src/infra/db/repositories/movie.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Movie, movieSchema } from 'src/infra/db/models/movie.model';
import { JwtService } from 'src/infra/jwt/jwt.service';
import { LikeRepository } from 'src/infra/db/repositories/like.repository';
import { Like, likeSchema } from 'src/infra/db/models/like.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Movie.name, schema: movieSchema }]),
    MongooseModule.forFeature([{ name: Like.name, schema: likeSchema }])
  ],
  controllers: [MovieController],
  providers: [MovieService, MovieRepository, JwtService, LikeRepository]
})
export class MovieModule {}
