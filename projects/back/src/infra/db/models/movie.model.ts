import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Movie extends Document {
  @Prop({ required: true, unique: true })
  tmdb_id: number;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  original_title: string;

  @Prop({ required: true })
  backdrop_path: string;

  @Prop({ required: true })
  poster_path: string;

  @Prop({ type: Date, required: true })
  release_date: Date;

  @Prop({ required: true })
  overview: string;
}

export const movieSchema = SchemaFactory.createForClass(Movie);
