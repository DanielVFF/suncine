import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Movie } from '../models/movie.model';
import { formatResult } from 'src/infra/utils/format-mongoose-result-fn';

@Injectable()
export class MovieRepository {
  constructor(
    @InjectModel(Movie.name) private readonly movieModel: Model<Movie>,
  ) {}

  async create(movie: Partial<Movie>): Promise<Movie> {
    return await (new this.movieModel(movie)).save();
  }

  async findOneByTmdbId(tmdb_id: number): Promise<Movie | null> {
    return await this.movieModel.findOne({ tmdb_id }).exec();
  }

  async findAll(): Promise<Movie[]> {
    return formatResult(await this.movieModel.find().lean().exec());
  }

  async findById(id: string): Promise<Movie | null> {
    return await this.movieModel.findById(id).exec();
  }

  async searchByTitle(title: string): Promise<Movie[]> {
    return await this.movieModel.find({
      title: { $regex: title, $options: 'i' },
    }).exec();
  }
}
