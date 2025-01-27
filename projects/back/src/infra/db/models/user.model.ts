import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export interface UserData {
  id: string;
  login: string;
  password: string;
  salt: string;
  name: string;
}

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ type: String, required: true, unique: true, index: true })
  login: string;

  @Prop({ type: String, required: true })
  password: string;

  @Prop({ type: String, required: true })
  salt: string;

  @Prop({ type: String, required: true })
  name: string;
}

export const userSchema = SchemaFactory.createForClass(User);
