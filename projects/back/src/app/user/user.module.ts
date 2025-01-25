import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from 'src/infra/db/repositories/user.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { userSchema } from 'src/infra/db/models/user.model';
import { JwtService } from 'src/infra/jwt/jwt.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: userSchema }])
  ],
  providers: [UserService, UserRepository, JwtService],
  controllers: [UserController],
  exports: [UserService]
})
export class UserModule {}
