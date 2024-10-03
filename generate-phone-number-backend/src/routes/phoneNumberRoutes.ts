import { Elysia, t } from "elysia";
import * as services from "../services";
import { authentication } from "../plugins";

const routes = new Elysia({ prefix: "/api/v1" })
  .use(authentication)
  .get("/retrieve-phone-number", async ({ decodedJwt }) => {
    try {
      const { refreshToken, userId } = decodedJwt as {
        refreshToken: string,
        userId: string
      };
      const spreadsheetId = Bun.env.SPREAD_SHEET_ID || "";
      const range = "Sheet1!A1:$1";

      const sheetValues = await services.sheetGoogle.fetchSheetData(userId, refreshToken, spreadsheetId, range);

      return sheetValues || {
        message: "yeah"
      };

    } catch (error) {
      console.log({ error });
      return {
        message: "error happened"
      }
    }
  })
  .post("/update-phone-number", async ({ decodedJwt }) => {
    const { refreshToken, userId } = decodedJwt as {
      refreshToken: string,
      userId: string
    };

    const spreadSheetId = Bun.env.SPREAD_SHEET_ID;
    const range = "Sheet2!A1";

    const sheetValues = await services.sheetGoogle.appendSheet(userId, refreshToken, spreadSheetId, range);

    return sheetValues || {
      message: "yeah"
    };
  }, {
    body: t.Object({
      status: t.String()
    })
  })

export default routes;
