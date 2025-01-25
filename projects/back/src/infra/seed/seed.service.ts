import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { AuthService } from 'src/app/auth/auth.service';
import { SecretService } from '../secrets/secrets.service';
import { EnvironmentConfigService } from '../enviroment-config/environment-config.service';
import { UserData } from '../db/models/user.model';

@Injectable()
export class SeedService implements OnApplicationBootstrap {
  constructor(
    private readonly authService: AuthService,
    private readonly secretService: SecretService,
    private readonly environmentService: EnvironmentConfigService,
  ) { }

  async onApplicationBootstrap() {
    await this.seed();
  }

  private async seed() {
    await this.firstUser()
  }

  private async firstUser() {
    const { hash, salt } = await this.secretService.encrypt(
      this.environmentService.getPepper(),
      this.environmentService.getUserPass()
    )
    const user_raw: Omit<UserData, "id"> = {
      login: this.environmentService.getUserLogin(),
      password: hash,
      salt: salt,
      name: "Dev"
    }
    this.authService.fetchByLoginOrCreate(user_raw)
    console.info(`First User's Seed executed`)
  }
}
