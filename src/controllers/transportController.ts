import { Request, Response, NextFunction } from "express";
import TransportOption from "../models/TransportOption";
import AppError from "./../utils/apperror";

export const getAllTransportOptions = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const options = await TransportOption.find();
    res.status(200).json({
      success: true,
      data: options,
    });
  } catch (error) {
    return next(new AppError("Error fetching transport options", 500));
  }
};

// Add a new transport option
export const addTransportOption = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, cost, time, carbonEmission } = req.body;

    // Validate input
    if (!name || !cost || !time || !carbonEmission) {
      return next(
        new AppError(
          "Please provide all required fields: name, cost, time, carbonEmission with cost and carbonEmission value will be more than 0",
          400
        )
      );
    }

    // Create a new transport option
    const newOption = new TransportOption({ name, cost, time, carbonEmission });
    await newOption.save();

    res.status(201).json({
      success: true,
      message: "Transport option added successfully",
      data: newOption,
    });
  } catch (error) {
    return next(new AppError("Internal Server Error", 500));
  }
};
