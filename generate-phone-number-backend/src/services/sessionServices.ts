import { NotFoundError } from "elysia";
import { addMinutes } from "date-fns";
import db from "../database/prisma.setup";
import type { Session } from "../types";

export const createSession = async (
  userId: string,
  accessToken: string,
  refreshToken: string,
  tokenExpiresAt: Date,
  sessionDurationMinutes: number
): Promise<Session> => {
  try {
    const session = await db.session.create({
      data: {
        userId,
        token: accessToken,
        refreshToken,
        tokenExpiresAt,
        expiredAt: addMinutes(new Date(), sessionDurationMinutes),
      },
    });

    return session;
  } catch (error) {
    console.log({ error })
    throw error;
  }
};

export const checkAndExpandDurationTime = async (email: string, token: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new NotFoundError("Người dùng không tìm thấy");
    }

    const now = new Date();
    const session = await db.session.findFirst({
      where: {
        userId: user.id,
        token,
        expiredAt: { gte: now },
      },
    });

    if (!session) {
      return null;
    }

    const newExpiredDate = addMinutes(now, 60);
    await db.session.update({
      where: {
        id: session.id,
      },
      data: {
        expiredAt: newExpiredDate, user: {
          update: {
            userStatus: "ONLINE"
          }
        }
      },
    });

    return user;
  } catch (error) {
    throw error;
  }
};

export const endSession = async (userId: string, refreshToken: string) => {
  try {
    await db.user.update({
      where: {
        id: userId
      }, data: {
        userStatus: "OFFLINE",
        Session: {
          delete: {
            userId_refreshToken: {
              userId, refreshToken
            }
          }
        }
      }
    })
  } catch (error) {
    throw error;
  }
};
