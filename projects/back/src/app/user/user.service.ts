import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/infra/db/repositories/user.repository';

@Injectable()
export class UserService {
    constructor(private readonly repo: UserRepository){}

    async findAll(){
        return await this.repo.findAll();
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
