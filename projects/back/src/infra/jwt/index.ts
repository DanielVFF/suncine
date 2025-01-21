import jwt from "jsonwebtoken"

export interface JwtContract {
  sign<T extends string | Buffer | object>(data: T, SECRET: string, config: JwtSignConfig): string
  verify<T>(token: string, SECRET: string): JwtVerify<T>
}

export interface JwtSignConfig {
  expires_in: string
}

export type JwtVerify<T> = JwtVerifyValid<T> | JwtVerifyInvalid

export interface JwtVerifyValid<T> {
  status: "VALID"
  payload: T
}

export interface JwtVerifyInvalid {
  status: "INVALID"
  payload: undefined
}

export function Auth0JsonWebToken() {
  return {
    sign: <T extends string | Buffer | object>(data: T, SECRET: string, config: JwtSignConfig) =>
      sign<T>(data, SECRET, config),
    verify: <T>(token: string, SECRET: string) => verify<T>(token, SECRET)
  }
}

function sign<T extends string | Buffer | object>(
  data: T,
  SECRET: string,
  config: JwtSignConfig
): string {
  return jwt.sign(data, SECRET, { expiresIn: config.expires_in })
}

function verify<T>(token: string, SECRET: string): JwtVerify<T> {
  try {
    const decoded = jwt.verify(token, SECRET)
    return {
      status: "VALID",
      payload: decoded as T
    }
  } catch (_error) {
    return {
      status: "INVALID",
      payload: undefined
    }
  }
}
