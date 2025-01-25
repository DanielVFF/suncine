import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { AuthService } from 'src/app/auth/auth.service';
import { SecretService } from '../secrets/secrets.service';
import { JwtService } from '../jwt/jwt.service';
import { UserRepository } from '../db/repositories/user.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { userSchema } from '../db/models/user.model';

@Module({
      imports: [
            MongooseModule.forFeature([{ name: 'User', schema: userSchema }])
      ],
      providers: [AuthService, SecretService, JwtService, SeedService , UserRepository],
      exports: []
})
export class SeedModule { }
