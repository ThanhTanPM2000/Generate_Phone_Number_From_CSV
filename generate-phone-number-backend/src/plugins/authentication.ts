import Elysia from "elysia";
import { t } from "elysia"

import UnAuthorizedError from "../domain/exceptions/UnAuthorizedError";
import jwtPlugin from "./jwtPlugin";

import { DecodedJWT } from "../types";


const authPlugin = (app: Elysia) =>
  app.use(jwtPlugin)
    .guard({
      cookie: t.Object({
        kitawa_auth: t.String()
      })
    })
    .derive(async ({ jwt, cookie: { kitawa_auth } }) => {
      const decodedJwt = (await jwt.verify(kitawa_auth.value)) as DecodedJWT;
      if (!kitawa_auth || !decodedJwt || !decodedJwt.userId || !decodedJwt.email || !decodedJwt.isAdmin || !decodedJwt.name || !decodedJwt.picture || !decodedJwt.refreshToken) {
        const unAuthError = new UnAuthorizedError("Access Denied");
        return {
          message: unAuthError.message,
          code: unAuthError.status,
        };
      }
      return {
        decodedJwt
      }
    })

export default authPlugin;


