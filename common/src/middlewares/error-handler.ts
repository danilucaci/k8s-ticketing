import { ErrorRequestHandler } from "express";
import { CustomError } from "../errors/custom-error";

export const errorHandler: ErrorRequestHandler = (
  error: Error,
  req,
  res,
  next
) => {
  if (error instanceof CustomError) {
    return res.status(error.statusCode).send({
      errors: error.serializeErrors(),
    });
  }

  console.log(error);

  res.status(500).send({
    errors: [
      {
        message: error.message,
      },
    ],
  });
};
