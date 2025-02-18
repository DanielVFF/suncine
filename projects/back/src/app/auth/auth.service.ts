import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '../../infra/jwt/jwt.service';
import { SecretService } from 'src/infra/secrets/secrets.service';
import { UserRepository } from 'src/infra/db/repositories/user.repository';
import { UserData } from 'src/infra/db/models/user.model';
import { EnvironmentConfigService } from 'src/infra/enviroment-config/environment-config.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly argon2Service: SecretService,
    private readonly repo: UserRepository,
    private readonly environmentConfigService: EnvironmentConfigService,
  ) {}

  async fetchByLogin(login: string) {
    const user = await this.repo.findOneByLogin(login);
    if (!user) return;
    return {
      id: user.id as string,
      login: user.login,
      password: user.password,
      salt: user.salt,
      name: user.name,
    };
  }

  async fetchByLoginOrCreate(user_raw: Omit<UserData, 'id'>) {
    const user =
      (await this.repo.findOneByLogin(user_raw.login)) ??
      (await this.repo.create(user_raw));
    return {
      id: user.id as string,
      login: user.login,
      password: user.password,
      salt: user.salt,
      name: user.name,
    };
  }
  async login(loginDto: any) {
    const { login, password } = loginDto;
    const user = await this.fetchByLogin(login);
    if (!user) {
      throw new UnauthorizedException('Invalid login credentials');
    }

    const isNotValid = !(await this.argon2Service.validate(
      user.salt,
      this.environmentConfigService.getPepper(),
      user.password,
      password,
    ));
    if (isNotValid) {
      throw new UnauthorizedException('Invalid login credentials');
    }

    const { password: _p, salt: _s, ...userData } = user;
    const token = this.jwtService.sign(
      userData,
      this.environmentConfigService.getJwtToken(),
      { expires_in: 3000 },
    );

    return {
      status: 'OK',
      payload: {
        token,
        user: userData,
      },
    };
  }
}
