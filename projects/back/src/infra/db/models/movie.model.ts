import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Movie extends Document {
  @Prop({ required: true, unique: true,  type: Number })
  tmdb_id: number;

  @Prop({ required: true, type: String })
  title: string;

  @Prop({ required: true, type: String })
  original_title: string;

  @Prop({ required: true, type: String })
  backdrop_path: string;

  @Prop({ required: true, type: String })
  poster_path: string;

  @Prop({ type: Date, required: true })
  release_date: Date;

  @Prop({ required: true, type: String })
  overview: string;
}

export const movieSchema = SchemaFactory.createForClass(Movie);
