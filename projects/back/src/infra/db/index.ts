import { USER_MODEL } from "./models/user"
import { DbOp } from "./op"

export type DbContract = ReturnType<typeof DB>

export type DbModels = typeof MODELS

const MODELS = {
  USER: USER_MODEL,
}

export function DB() {
  return {
    MODELS,
    OP: DbOp(MODELS)
  }
}
