export type EnvVar = typeof ENV_VAR

export const ENV_VAR = {
  TMDB_TOKEN: process.env.TMDB_TOKEN as string,
  PEPPER: process.env.PEPPER as string,
  JWT_TOKEN: process.env.JWT_TOKEN as string,
  MONGO: {
    HOST: process.env.MONGO_HOST as string,
    PORT: process.env.MONGO_PORT as string,
    DB_NAME: process.env.MONGO_DB_NAME as string,
    LOGIN: process.env.MONGO_LOGIN as string,
    PASS: process.env.MONGO_PASS as string
  },
  USER: {
    LOGIN: process.env.DEFAULT_USER_LOGIN as string,
    PASS: process.env.DEFAULT_USER_PASS as string
  }
} as const
