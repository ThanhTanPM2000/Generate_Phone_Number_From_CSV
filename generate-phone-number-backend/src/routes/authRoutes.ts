import { Elysia, t } from "elysia";
import * as services from "../services";
import jwt from "jsonwebtoken"
import { jwtPlugin } from "../plugins";
import { authentication } from "../plugins";


type DecodedJwt = {
  userId: string;
  email: string;
  isAdmin: boolean;
  name: string;
  picture: string;
  refreshToken?: string;
};

const authRoutes = new Elysia().group("/api/v1/auth", (app) =>
  app.use(jwtPlugin)
    .post(
      "/login",
      async ({ cookie, body, jwt }) => {
        const { code } = body;
        const { email, name, picture, accessToken, tokenExpiredAt, refreshToken } = await services.oauthGoogle.exchangeCodeForToken(
          code,
        );

        const user = await services.user.findOrCreateUserByEmail(
          email,
          name,
          picture,
          "ONLINE"
        );

        const session = await services.session.createSession(user?.id, accessToken, refreshToken, tokenExpiredAt, 60);

        cookie.kitawa_auth.set({
          value: await jwt.sign({
            email,
            name,
            picture,
            refreshToken: session.refreshToken,
            userId: user?.id,
            isAdmin: user?.isAdmin?.toString()
          }),
          sameSite: "strict",
          priority: "high",
          path: "/",
          expires: new Date(Date.now() + 1000 * 3600 * 24 * 30),
        })

        return {
          email,
        };
      },
      {
        body: t.Object({
          code: t.String()
        }),
      }
    )
    .use(authentication)
    .post(
      "/logout",
      async ({ cookie, decodedJwt }) => {
        try {
          const { userId, refreshToken } = decodedJwt as {
            userId: string, refreshToken: string
          };
          await services.session.endSession(userId, refreshToken)

          cookie.kitawa_auth.set({
            value: "",
            path: "/",
            maxAge: 0,
            expires: new Date(Date.now()),
          });

          return {
            message: "Logout successfully",
            data: {}
          }
        } catch (error) {
          cookie.kitawa_auth.set({
            value: "",
            path: "/",
            maxAge: 0,
            expires: new Date(Date.now()),
          });
          throw error;
        }
      },
      {
        cookie: t.Object({
          kitawa_auth: t.String()
        }),
      }
    )
);

export default authRoutes;
