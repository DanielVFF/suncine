import { Document } from 'mongoose';

export interface User {
  id: string
  login: string
  name: string
}

export interface UserDataMongoose {
  id: string;
  login: string;
  password: string;
  salt: string;
  name: string;
}

export interface UserRawDataMongoose extends Document {
  login: string;
  password: string;
  salt: string;
  name: string;
}

export interface IUserRepository {
  create(user: Partial<UserRawDataMongoose>): Promise<UserRawDataMongoose>;
  findOneByLogin(login: string): Promise<UserRawDataMongoose | null>;
  findAll(): Promise<UserRawDataMongoose[]>;
  findById(id: string): Promise<UserRawDataMongoose | null>;
}
