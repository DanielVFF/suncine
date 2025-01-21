import type { DbModels } from "../.."
import type { UserData } from "../../models/user"

export async function findByLoginOrCreate(MODELS: DbModels, user_raw: Omit<UserData, "id">) {
  const user = await MODELS.USER.findOne({
    login: user_raw.login
  })
  if (!user) {
    const new_user = await MODELS.USER.create(user_raw)
    return {
      id: new_user.id as string,
      login: new_user.login,
      password: new_user.password,
      salt: new_user.salt,
      name: new_user.name
    }
  }
  return {
    id: user.id as string,
    login: user.login,
    password: user.password,
    salt: user.salt,
    name: user.name
  }
}
