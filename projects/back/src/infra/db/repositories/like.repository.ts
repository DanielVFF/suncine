import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DeleteResult, Model } from 'mongoose';
import { Like } from '../models/like.model';
import { formatResult } from 'src/infra/utils/format-mongoose-result-fn';
import { MovieResult } from 'src/interfaces/movie.interface';
import { ILikeRepository } from 'src/interfaces/like.interface';

@Injectable()
export class LikeRepository implements ILikeRepository {
  constructor(@InjectModel(Like.name) private likeModel: Model<Like>) {}

  async create(userId: string, movieId: string): Promise<Like> {
    const newLike = new this.likeModel({
      user: userId,
      movie: movieId,
    });

    return await newLike.save();
  }
  async findByMovieAndUserId(userId: string, movieId: string): Promise<Like | null> {
    return await this.likeModel.findOne({ user: userId, movie: movieId });
  }

  async findAll(): Promise<Like[]> {
    return await this.likeModel.find().exec();
  }
  async deleteByMovieAndUserId(userId: string, movieId: string): Promise<DeleteResult> {
    return await this.likeModel.deleteOne({ user: userId, movie: movieId });
  }

  async countLikesByMovieId(movieId: string): Promise<number> {
    return await this.likeModel.countDocuments({ movie: movieId });
  }

  async findByUserId(userId: string): Promise<Like[]> {
    const likes = await this.likeModel.find({ user: userId }).select({_id: 1, movie: 1,}).lean().exec();
    return formatResult(likes)
  }
  

  async findTop10Movies(): Promise<MovieResult[]> {
    const topMovies = await this.likeModel.aggregate([
      {
        $group: {
          _id: '$movie',
          likes: { $sum: 1 },
        },
      },
      {
        $sort: { likes: -1 },
      },
      {
        $limit: 10,
      },
      {
        $lookup: {
          from: 'movies',
          localField: '_id',
          foreignField: '_id', 
          as: 'movieDetails', 
        },
      },
      {
        $unwind: '$movieDetails',
      },
      {
        $project: {
          _id: 0, 
          id: '$_id',  
          tmdb_id: '$movieDetails.tmdb_id',  
          title: '$movieDetails.title',  
          original_title: '$movieDetails.original_title',  
          backdrop_path: '$movieDetails.backdrop_path',  
          poster_path: '$movieDetails.poster_path',  
          release_date: '$movieDetails.release_date',  
          overview: '$movieDetails.overview',  
          likes: 1,
        },
      },
    ]);
    
    return formatResult(topMovies);
  }
  

}
