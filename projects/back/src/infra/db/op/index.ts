import type { DbModels } from ".."
import { UserOp } from "./user"

export function DbOp(MODEL: DbModels) {
  return {
    USER: UserOp(MODEL)
  }
}
