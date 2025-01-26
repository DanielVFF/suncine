import { IsMongoId } from 'class-validator';

export class LikeOrUnlikeMovieDto {
    @IsMongoId()
    movieId: string;
}
