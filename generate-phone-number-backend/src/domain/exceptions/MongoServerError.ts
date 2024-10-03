import { StatusCodes } from "http-status-codes";

export default class ConflictError extends Error {
  public status: number;
  public code: number;

  constructor(message: string, code: number) {
    super(message);
    this.name = "MongoServerError";
    this.code = code;
    this.status = StatusCodes.INTERNAL_SERVER_ERROR;
  }
}
