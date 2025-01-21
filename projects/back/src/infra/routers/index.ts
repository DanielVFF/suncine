import type { FastifyInstance } from "fastify"
import { AUTH_ROUTERS } from "./auth"

export function addRouters(APP: FastifyInstance) {
  const ROUTERS = [...AUTH_ROUTERS]
  for (const current of ROUTERS) {
    APP.route(current)
  }
}
