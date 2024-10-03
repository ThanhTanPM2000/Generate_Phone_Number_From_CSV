import jwt from "@elysiajs/jwt"
import { Elysia } from "elysia"

const jwtPlugin = new Elysia().use(jwt({
  name: "jwt",
  secret: Bun.env.JWT_SECRET || ""
}))

export default jwtPlugin
