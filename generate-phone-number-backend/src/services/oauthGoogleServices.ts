import axios from "axios";
import db from "../database/prisma.setup";
import { google } from "googleapis";
import jwt from "jsonwebtoken";

type TokenResponse = {
  access_token: string,
  refresh_token: string,
  scope: string,
  token_type: string,
  id_token: string,
  expires_date: number
}

type GoooglesUserInfo = {
  name: string;
  email: string;
  email_verified: boolean;
  sub: string;
  picture: string;
  given_name: string;
  family_name: string;
  locale: string;
};

export const getOAuthClient = () => {
  const oauth2Client = new google.auth.OAuth2(
    Bun.env.GOOGLE_CLIENT_ID,
    Bun.env.GOOGLE_CLIENT_SECRET,
    Bun.env.REDIRECT_URI
  );
  return oauth2Client
}

export const exchangeCodeForToken = async (
  code: string,
) => {
  try {
    const oauth2Client = getOAuthClient();

    const { tokens } = await oauth2Client.getToken(code);

    if (!tokens || !tokens.id_token || !tokens.expiry_date) {
      throw new Error("Failed to retrieve tokens.");
    }
    const tokenExpiredAt = new Date(new Date().getTime() + (tokens.expiry_date));

    const decodedJWT = <GoooglesUserInfo>jwt.decode(tokens.id_token);

    return {
      accessToken: tokens.access_token || "",
      refreshToken: tokens.refresh_token || "",
      tokenExpiredAt,
      ...decodedJWT
    };
  } catch (error) {
    console.log({ error })
    throw error;
  }
};

export const refreshAccessToken = async (refreshToken: string): Promise<string> => {
  try {
    // const refreshTokenURL = "https://oauth2.googleapis.com/token";
    //
    //
    // const response = await axios.post(refreshTokenURL, {
    //   client_id: Bun.env.GOOGLE_CLIENT_ID,
    //   client_secret: Bun.env.GOOGLE_CLIENT_SECRET,
    //   grant_type: "refresh_token",
    //   refresh_token: refreshToken
    // })
    //
    // console.log({ response })
    //
    // return response?.data?.access_token;
    const oauth2Client = getOAuthClient();

    oauth2Client.setCredentials({
      refresh_token: refreshToken
    })

    const { token } = await oauth2Client.getAccessToken();
    if (!token) throw new Error("Failed to refresh access token.");
    return token;  // Return the new access token
  } catch (error) {
    throw error
  }
}

