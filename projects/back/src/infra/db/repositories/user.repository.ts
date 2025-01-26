import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { IUserRepository, UserRawDataMongoose } from 'src/interfaces/user.interface';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserRawDataMongoose>,
  ) {}

  async create(user: Partial<UserRawDataMongoose>): Promise<UserRawDataMongoose> {
    return await new this.userModel(user).save();
  }

  async findOneByLogin(login : string){
    return await this.userModel.findOne({
      login
    })
  }

  async findAll(): Promise<UserRawDataMongoose[]> {
    return await this.userModel.find().exec();
  }

  async findById(id: string): Promise<UserRawDataMongoose | null> {
    return await this.userModel.findById(id).exec();
  }
}
