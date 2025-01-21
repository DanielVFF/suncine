import type { DbModels } from "../.."
import type { UserData } from "../../models/user"
import { fetchByLogin } from "./fetch-by-login"
import { findByLoginOrCreate } from "./find-by-login-or-create"

export function UserOp(MODELS: DbModels) {
  return {
    fetchByLogin(login: string) {
      return fetchByLogin(MODELS, login)
    },
    findByLoginOrCreate(user_raw: Omit<UserData, "id">) {
      return findByLoginOrCreate(MODELS, user_raw)
    }
  }
}
