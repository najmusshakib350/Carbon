import { Request, Response, NextFunction } from "express";
import AppError from "./../utils/apperror";

interface ErrorWithStatus extends Error {
  statuscode?: number;
  status?: string;
  isoperational?: boolean;
  keyValue?: string | string | number;
  path?: string;
  value?: string | number | null;
  errorResponse?: {
    code?: number;
  };
}

const handleDuplicateKeyErrorDB = (err: ErrorWithStatus): AppError => {
  let message = "";

  if (err.keyValue) {
    Object.entries(err.keyValue).forEach(([key, value]) => {
      message += `${key}: ${value} is already exist. `;
    });
  }

  return new AppError(message, 400);
};

const handleCastErrorDB = (err: ErrorWithStatus): AppError => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};

// Development error middleware
function developmentError(
  err: ErrorWithStatus,
  req: Request,
  res: Response,
): void {
  res.status(err.statuscode || 500).json({
    status: err.status || "error",
    message: err.message,
    error: err,
  });
}

// Production error middleware
function productionError(
  err: ErrorWithStatus,
  req: Request,
  res: Response,
): void {
  if (err.isoperational) {
    res.status(err.statuscode || 500).json({
      status: err.status || "error",
      message: err.message,
    });
  } else {
    res.status(500).json({
      status: "error",
      message: "Something went wrong!",
    });
  }
}

export default (
  err: ErrorWithStatus,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  err.statuscode = err.statuscode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    if (err?.errorResponse?.code === 11000) {
      const error = handleDuplicateKeyErrorDB(err);
      developmentError(error, req, res);
    } else if (err?.name === "CastError") {
      const error = handleCastErrorDB(err);
      developmentError(error, req, res);
    } else {
      developmentError(err, req, res);
    }
  } else if (process.env.NODE_ENV === "production") {
    if (err?.errorResponse?.code === 11000) {
      const error = handleDuplicateKeyErrorDB(err);
      productionError(error, req, res);
    } else if (err?.name === "CastError") {
      const error = handleCastErrorDB(err);
      productionError(error, req, res);
    } else {
      productionError(err, req, res);
    }
  }

  next();
};
