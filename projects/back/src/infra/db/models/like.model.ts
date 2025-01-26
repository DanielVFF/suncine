import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from './user.model';
import { Movie } from './movie.model';

@Schema({ timestamps: true })
export class Like extends Document {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: User.name, required: true })
  user: User;  

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: Movie.name, required: true })
  movie: Movie; 

  @Prop({ type: Date, default: Date.now })
  likedAt: Date;  
}

export const likeSchema = SchemaFactory.createForClass(Like);
