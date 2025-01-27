import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtService } from 'src/infra/jwt/jwt.service';
import { SecretService } from 'src/infra/secrets/secrets.service';
import { MongooseModule } from '@nestjs/mongoose';
import { userSchema } from 'src/infra/db/models/user.model';
import { UserRepository } from 'src/infra/db/repositories/user.repository';
import { AuthController } from './auth.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: userSchema }])],
  providers: [AuthService, JwtService, SecretService, UserRepository],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
