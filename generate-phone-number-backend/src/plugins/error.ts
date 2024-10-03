import { HttpStatusCode } from "axios";
import Elysia from "elysia";
import NotFoundError from "../domain/exceptions/NotFoundError";
import UnAuthorizedError from "../domain/exceptions/UnAuthorizedError";
import ErrorResponse from "../domain/types/generics/ErrorResponse";

const errorPlugin = new Elysia()
  .error({ NotFoundError, UnAuthorizedError })
  .onError((handler): ErrorResponse<number> => {
    console.error(handler.error?.stack);

    if (
      handler.error instanceof NotFoundError ||
      handler.error instanceof UnAuthorizedError
    ) {
      handler.set.status = handler.error.status;

      return {
        message: handler.error.message,
        code: handler.error.status,
      };
    }

    if (handler.code == "NOT_FOUND") {
      return {
        message: "Not Found",
        code: HttpStatusCode.NotFound,
      };
    }

    if (handler.code == "VALIDATION") {
      return {
        message: "Bad Request",
        code: HttpStatusCode.BadRequest,
      };
    }

    return {
      message: "Internal Server Error",
      code: HttpStatusCode.InternalServerError,
    };
  });

export default errorPlugin;
