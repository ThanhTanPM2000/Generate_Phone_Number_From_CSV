import { Elysia } from "elysia";
import userRoutes from "./routes/userRoutes";
import authRoutes from "./routes/authRoutes";
import phoneNumberRoutes from "./routes/phoneNumberRoutes";
import spreadsheetRoutes from "./routes/spreadsheetRoutes";
import jwt from "@elysiajs/jwt";
import setup from "./setup";
import { error } from "./plugins";
import "./database/prisma.setup";

const app = new Elysia()
  .use(setup)
  .use(
    jwt({
      namw: "jwt",
      secret: Bun.env.JWT_SECRET || "",
    }),
  )
  .use(error)
  .use(authRoutes)
  .use(userRoutes)
  .use(phoneNumberRoutes)
  .use(spreadsheetRoutes)
  .listen(4000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
