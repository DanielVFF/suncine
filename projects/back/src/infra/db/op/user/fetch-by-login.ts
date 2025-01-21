import type { DbModels } from "../.."

export async function fetchByLogin(MODELS: DbModels, login: string) {
  const user = await MODELS.USER.findOne({
    login
  })
  if (!user) return
  return {
    id: user.id as string,
    login: user.login,
    password: user.password,
    salt: user.salt,
    name: user.name
  }
}
