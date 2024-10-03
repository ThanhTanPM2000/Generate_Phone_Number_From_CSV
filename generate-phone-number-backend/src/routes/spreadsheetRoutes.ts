import { Elysia, t } from "elysia";
import * as services from "../services";
import { authentication } from "../plugins";

type DecodedJwt = {
  userId: string;
  email: string;
  isAdmin: boolean;
  name: string;
  picture: string;
  refreshToken?: string;
};

const routes = new Elysia({ prefix: "/api/v1" })
  .use(authentication)
  .get("/spreadsheets", async ({ query }) => {
    const { page, size, isGettingAll, search } = query;

    const paginatedData = await services.spreadsheet.getSpreadsheets(page, size, isGettingAll, search);
    return paginatedData
  }, {
    query: t.Object({
      page: t.Optional(t.Numeric({ default: 1 })),
      size: t.Optional(t.Numeric({ default: 10 })),
      isGettingAll: t.Optional(t.BooleanString({ default: false })),
      search: t.String(),
    })
  })
  .post("/spreadsheets", async ({ body, decodedJwt }) => {
    const { userId } = decodedJwt as DecodedJwt;
    const { title, spreadsheetId, sheetName, headerRowIndex } = body;

    console.log({ sheetName, headerRowIndex })

    const spreadsheet = await services.spreadsheet.addSpreadsheet(userId, title, spreadsheetId, headerRowIndex, sheetName)

    return spreadsheet;
  }, {
    cookie: t.Object({
      kitawa_auth: t.String()
    }),
    body: t.Object({
      title: t.String(),
      spreadsheetId: t.String(),
      sheetName: t.Optional(t.String({ default: "Sheet1" })),
      headerRowIndex: t.Optional(t.Numeric({ default: 1 }))
    })
  })

export default routes;
