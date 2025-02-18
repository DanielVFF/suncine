import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from 'src/infra/db/repositories/user.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { User, userSchema } from 'src/infra/db/models/user.model';
import { JwtService } from 'src/infra/jwt/jwt.service';
import { SecretService } from 'src/infra/secrets/secrets.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: userSchema }]),
  ],
  providers: [UserService, UserRepository, JwtService, SecretService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
