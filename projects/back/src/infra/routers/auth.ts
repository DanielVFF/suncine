import type { FastifyReply, FastifyRequest } from "fastify"
import { ENV_VAR } from "../../../env"
import { loginUseCase } from "../../use-cases/auth/login"
import { DB } from "../db"
import { Auth0JsonWebToken } from "../jwt"

const LOGIN = {
  method: "POST",
  url: "/login",
  handler: async (req: FastifyRequest, reply: FastifyReply) => {
    const { login, password } = req.body as { login: string; password: string }
    try {
      const payload = await loginUseCase(DB(), Auth0JsonWebToken(), ENV_VAR, login, password)
      return reply.status(200).send(payload)
    } catch (error) {
      console.error(error)
      return reply.status(500).send()
    }
  }
}

export const AUTH_ROUTERS = [LOGIN]
