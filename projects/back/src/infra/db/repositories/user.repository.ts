import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { UserRawDataMongoose } from 'src/interfaces/user/user.interface';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserRawDataMongoose>,
  ) {}

  async create(user: Partial<UserRawDataMongoose>): Promise<UserRawDataMongoose> {
    const newUser = new this.userModel(user);
    return newUser.save();
  }

  async findAll(): Promise<UserRawDataMongoose[]> {
    return this.userModel.find().exec();
  }

  async findById(id: string): Promise<UserRawDataMongoose | null> {
    return this.userModel.findById(id).exec();
  }
}
