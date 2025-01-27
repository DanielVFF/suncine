import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { User } from 'src/infra/db/models/user.model';
import { UserRepository } from 'src/infra/db/repositories/user.repository';
import { EnvironmentConfigService } from 'src/infra/enviroment-config/environment-config.service';
import { SecretService } from 'src/infra/secrets/secrets.service';

@Injectable()
export class UserService {
    constructor(private readonly repo: UserRepository, private readonly environmentService : EnvironmentConfigService, private readonly secretService: SecretService){}

    async findAll(){
        return await this.repo.findAll();
    }

    async create(user: CreateUserDto): Promise<Partial<User>> {
      const userExists = !!(await this.repo.findOneByLogin(user.login));
      if(userExists) throw new BadRequestException('Email already exists')
      const { hash, salt } = await this.secretService.encrypt(
        this.environmentService.getPepper(),
        user.password
      )
      user.salt = salt
      user.password = hash
      

      const new_user = await this.repo.create(user)
      return {
        id: new_user.id as string,
        login: new_user.login,
        password: new_user.password,
        salt: new_user.salt,
        name: new_user.name
      }
    }

    async fetchByLogin(login: string) {
      const user = await this.repo.findOneByLogin(login)
      if (!user) return
      return {
        id: user.id as string,
        login: user.login,
        password: user.password,
        salt: user.salt,
        name: user.name
      }
    }
    
}
