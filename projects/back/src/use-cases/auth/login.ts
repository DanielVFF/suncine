import type { EnvVar } from "../../../env"
import type { DbContract } from "../../infra/db"
import type { JwtContract } from "../../infra/jwt"
import { Argon2Encrypt } from "../../infra/secrets"

export async function loginUseCase(
  DB: DbContract,
  JWT: JwtContract,
  ENV_VAR: EnvVar,
  login: string,
  password: string
) {
  const user = await DB.OP.USER.fetchByLogin(login)
  if (!user) {
    return {
      status: "UNAUTHORIZED",
      paylod: undefined
    }
  }
  const is_not_valid = !(await Argon2Encrypt().validate(
    user.salt,
    ENV_VAR.PEPPER,
    user.password,
    password
  ))
  if (is_not_valid) {
    return {
      status: "UNAUTHORIZED",
      paylod: undefined
    }
  }
  const { password: _p, salt: _s, ...user_data } = user
  const token = JWT.sign(user_data, ENV_VAR.JWT_TOKEN, { expires_in: "7d" })
  return {
    status: "OK",
    payload: {
      token,
      user: user_data
    }
  }
}
