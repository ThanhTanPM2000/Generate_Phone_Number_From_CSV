import { JWTPayloadSpec } from "@elysiajs/jwt";

export type UserStatus = "ONLINE" | "OFFLINE";

export type DecodedJWT = {
  userId: string;
  email: string;
  isAdmin: boolean;
  name: string;
  picture: string;
  refreshToken: string;
} | Record<string, string | number> & JWTPayloadSpec

export type User = {
  id: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  isAdmin: boolean;
  userStatus: UserStatus;
  name: string;
  picture: string;
  sessions?: Session[];
};

export type Session = {
  id: string;
  userId: string;
  refreshToken: string;
  expiredAt: Date;
  data: string | null;
  createdAt: Date;
  updatedAt: Date;
};
