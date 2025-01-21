import * as argon2 from "@node-rs/argon2"
import { nanoid } from "nanoid"

export function Argon2Encrypt() {
  return {
    encrypt: (PEPPER: string, data: string) => encrypt(PEPPER, data),
    validate: (SALT: string, PEPPER: string, HASH: string, data: string) =>
      validate(SALT, PEPPER, HASH, data)
  }
}

async function encrypt(PEPPER: string, data: string) {
  const SALT = nanoid()
  const SEASONED = data + SALT + PEPPER
  const HASH = await argon2.hash(SEASONED)
  return { hash: HASH, salt: SALT }
}

async function validate(
  SALT: string,
  PEPPER: string,
  HASH: string,
  data: string
): Promise<boolean> {
  const SEASONED = data + SALT + PEPPER
  return await argon2.verify(HASH, SEASONED)
}
