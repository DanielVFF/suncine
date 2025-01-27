export interface IEnvironmentConfigService {
  getMongoUrl(): string;
  getPepper(): string;
  getUserLogin(): string;
  getUserPass(): string;
  getTmdbApiKey(): string;
  getJwtToken(): string;
}
