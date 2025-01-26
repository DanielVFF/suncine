import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { AuthService } from 'src/app/auth/auth.service';
import { SecretService } from '../secrets/secrets.service';
import { JwtService } from '../jwt/jwt.service';
import { UserRepository } from '../db/repositories/user.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { User, userSchema } from '../db/models/user.model';
import { TmdbService } from 'src/app/tmdb/tmdb.service';
import { HttpService } from '../http/http.service';
import { MovieRepository } from '../db/repositories/movie.repository';
import { Movie, movieSchema } from '../db/models/movie.model';

@Module({
      imports: [
            MongooseModule.forFeature([{ name: Movie.name, schema: movieSchema }]),
            MongooseModule.forFeature([{ name: User.name, schema: userSchema }])
      ],
      providers: [AuthService, SecretService, JwtService, SeedService , UserRepository, TmdbService, HttpService, MovieRepository],
      exports: []
})
export class SeedModule { }
