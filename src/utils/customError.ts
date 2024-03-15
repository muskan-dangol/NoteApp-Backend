import { Request, Response, NextFunction } from "express";
import { MongoError } from "mongodb";
import logger from "./logger";

const unknownEndpoint = (_req: Request, res: Response): void => {
  res.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (
  error: Error,
  _req: Request,
  res: Response,
  next: NextFunction
): void => {
  logger.error();
  switch (error.name) {
    case "CastError":
      res.status(400).send({ error: "malformatted id" });
      break;
    case "ValidationError":
      res.status(400).json({ error: error.message });
      break;
    case "MongoServerError":
      if ((error as MongoError).code === 11000) {
        res.status(400).json({ error: "expected unique value for the variable" });
      }
      break;
    case "JsonWebTokenError":
      res.status(400).json({ error: "Token is missing or invalid token has been given" });
      break;
    case "TokenExpiredError":
      res.status(401).json({ error: "Token has expired, Please renew the token" });
      break;
    case "InvalidUser":
      res.status(400).json({ error: "invalid user" });
      break;
    default:
      next(error);
  }
};

export default {
  unknownEndpoint,
  errorHandler,
};
