import cors from "@fastify/cors"
import Fastify from "fastify"
import { addRouters } from "./infra/routers"
import mongoose from "mongoose"
import { ENV_VAR } from "../env"
import { RunSeed } from "./infra/seed"
import { DB } from "./infra/db"
import swagger from "@fastify/swagger"
import swaggerUi from "@fastify/swagger-ui"
import path from "node:path"

const PORT = 3000

const fastify = Fastify({
  logger: true
}).register(cors, { origin: "*" }).decorateRequest("user", undefined)

addRouters(fastify)

fastify
  .register(swagger, {
    mode: "static",
    specification: {
      path: path.join(__dirname, "..", "openapi.yaml"),
      baseDir: __dirname
    }
  })
  .register(swaggerUi, {
    routePrefix: "/docs",
    uiConfig: {
      docExpansion: "none",
      deepLinking: false
    },
    theme: {
      title: "SunCine API Doc"
    }
  })

async function Start() {
  try {
    await mongoose.connect(
      `mongodb://${ENV_VAR.MONGO.LOGIN}:${ENV_VAR.MONGO.PASS}@${ENV_VAR.MONGO.HOST}:${ENV_VAR.MONGO.PORT}`
    )
    console.info("Mongo connected!")
    await RunSeed(DB(), ENV_VAR)
    await fastify.ready()
    await fastify.listen({ port: PORT })
    console.info()
    console.info("+++++++++++")
    console.info(`Server running on port: ${PORT}`)
    console.info(`Swagger docs available at http://localhost:${PORT}/docs`)
    console.info("+++++++++++")
    console.info()
  } catch (error) {
    console.error(error)
    fastify.log.error(error)
    process.exit(1)
  }
}

Start()
