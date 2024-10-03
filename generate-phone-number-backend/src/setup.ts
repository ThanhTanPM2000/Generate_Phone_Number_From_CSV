import Elysia from "elysia";
import cors from "@elysiajs/cors";
import jwt from "@elysiajs/jwt";
import { swagger } from "@elysiajs/swagger";

const setup = new Elysia()
  .use(
    cors({
      origin: "localhost:3000",
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: true
    }),
  )
  .use(
    jwt({
      namw: "jwt",
      secret: Bun.env.JWT_SECRET || "",
    }),
  )
  .use(
    swagger({
      path: "/v1/swagger",
      documentation: {
        info: {
          title:
            "Kitawa Customer's phone number generation built with Elysia.js",
          version: "0.0.1",
        },
      },
    }),
  );
export default setup;
