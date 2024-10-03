import { Elysia, t } from "elysia";
import * as services from "../services";
const routes = new Elysia({ prefix: "/api/v1" })
  .get("/me", async ({ cookie }) => {
    const { email, token, userId } = cookie.me.value

    let sanitizedUser;
    if (!email || !token || !userId) {
      cookie.me.remove()
    } else {
      sanitizedUser = await services.session.checkAndExpandDurationTime(email, token)
    }

    return sanitizedUser;

  }, {
    cookie: t.Object({
      me: t.Object({
        userId: t.String(),
        email: t.String(),
        name: t.String(),
        picture: t.String(),
        token: t.String(),
        isAdmin: t.Boolean()
      }),
    }
    )
  })

export default routes;
