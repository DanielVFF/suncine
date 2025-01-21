import type { EnvVar } from "../../../env"
import type { DbContract } from "../db"
import type { UserData } from "../db/models/user"
import { Argon2Encrypt } from "../secrets"

export async function RunSeed(DB: DbContract, ENV_VAR: EnvVar) {
  const { hash, salt } = await Argon2Encrypt().encrypt(ENV_VAR.PEPPER, ENV_VAR.USER.PASS)
  const USER: Omit<UserData, "id"> = {
    login: ENV_VAR.USER.LOGIN,
    password: hash,
    salt: salt,
    name: "Dev"
  }
  await DB.OP.USER.findByLoginOrCreate(USER)
}
