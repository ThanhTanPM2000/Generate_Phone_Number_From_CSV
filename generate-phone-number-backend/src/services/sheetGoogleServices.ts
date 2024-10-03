import axios from "axios"
import db from "../database/prisma.setup"
import { format, isPast } from "date-fns"
import { refreshAccessToken, getOAuthClient } from "./oauthGoogleServices"
import { google } from "googleapis"
import { now } from "mongoose"

export const fetchSheetData = async (userId: string, refreshToken: string, spreadsheetId: string, range: string) => {
  try {
    const session = await db.session.findUnique({
      where: {
        userId_refreshToken: {
          userId,
          refreshToken
        }
      }
    })

    if (!session) {
      throw new Error("there is no session")
    }

    const accessToken = await refreshAccessToken(session.refreshToken);

    const googleSheetUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}`

    const response = await axios.get(googleSheetUrl, {
      headers: {
        "Authorization": `Bearer ${accessToken}`
      }
    })
    return response?.data?.values || {
      message: "yeah"
    };

  } catch (error) {
    console.log({ error });
    return {
      message: "error happened"
    }
  }
}

export const appendSheet = async (userId: string, refreshToken: string, spreadSheetId: string, range: string) => {
  try {
    const session = await db.session.findUnique({
      where: {
        userId_refreshToken: {
          userId,
          refreshToken
        }
      }
    })

    if (!session) {
      throw new Error("there is no session")
    }

    range = "Sheet1!1:4";
    let accessToken = session.token;

    const oauth2Client = getOAuthClient()
    accessToken = await refreshAccessToken(session.refreshToken);

    oauth2Client.setCredentials({
      access_token: accessToken,
    });

    const sheets = google.sheets({ version: "v4", auth: oauth2Client })

    try {
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId: Bun.env.SPREAD_SHEET_ID,
        requestBody: {
          requests: [{ addSheet: { properties: { title: `Kitawa ${format(new Date(), "dd/MM/yyyy")}` } } }]
        }
      })
    } catch (error) {
      console.log({ error })
    }

    const response = await sheets.spreadsheets.values.append({
      valueInputOption: "USER_ENTERED",
      spreadsheetId: spreadSheetId,
      range,
      requestBody: {
        values: [["hi", "hello"]]
      }
    }, {
    })


    return response?.data || {
      message: "yeah"
    };
  } catch (error) {
    throw error
  }
}


export const createSpreadSheet = async (title: string, accessToken: string) => {
  try {
    const URL = 'https://sheets.googleapis.com/v4/spreadsheets'

    console.log({ accessToken })

    const response = await axios.post(URL, {
      "spreadsheetId": Bun.env.SPREAD_SHEET_ID,
      "properties": {
        title
      },
    }, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })

    console.log({
      response
    })

    // const googleSpreadSheetId = Bun.env.SPREAD_SHEET_ID;
    // const oauth2Client = getOAuthClient();
    // oauth2Client.setCredentials({
    //   access_token: accessToken
    // })
    //
    // const sheets = google.sheets({ version: "v4", auth: oauth2Client })
    //
    // const spreadsheet = await sheets.spreadsheets.create({
    //   fields: googleSpreadSheetId,
    //   requestBody: {
    //     properties: {
    //       title: "sheet2"
    //     }
    //   }
    // })
    //
    // return spreadsheet.data.spreadsheetId;
  } catch (error) {
    throw error;
  }
}

