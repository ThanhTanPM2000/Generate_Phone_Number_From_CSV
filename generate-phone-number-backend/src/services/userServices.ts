import NotFoundError from "../domain/exceptions/NotFoundError";
import db from "../database/prisma.setup";
import { User, UserStatus } from "../types";

export const findOrCreateUserByEmail = async (
  email: string,
  name: string,
  picture: string,
  userStatus: UserStatus
): Promise<User> => {
  try {
    const user = await db.user.upsert({
      where: { email },
      update: {},
      create: {
        email,
        name,
        picture,
        userStatus,
      },
    });

    return user;
  } catch (error) {
    throw error;
  }
};
