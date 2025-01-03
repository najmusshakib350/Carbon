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
      const errMsg =
        "Please provide all required fields: name, cost, time, carbonEmission with cost and carbonEmission value will be more than 0";
      return next(new AppError(errMsg, 400));
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

// Update an existing transport option by ID
export const updateTransportOption = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { name, cost, time, carbonEmission } = req.body;

    // Validate input
    if (!name && !cost && !time && !carbonEmission) {
      return next(
        new AppError("Please provide at least one field to update.", 400)
      );
    }

    // Find and update the transport option
    const updatedOption = await TransportOption.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedOption) {
      return next(new AppError("Transport option not found.", 404));
    }

    res.status(200).json({
      success: true,
      message: "Transport option updated successfully.",
      data: updatedOption,
    });
  } catch (error) {
    return next(new AppError("Internal Server Error", 500));
  }
};

// Delete a transport option by ID
export const deleteTransportOption = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    // Find and delete the transport option
    const deletedOption = await TransportOption.findByIdAndDelete(id);

    if (!deletedOption) {
      return next(new AppError("Transport option not found.", 404));
    }

    res.status(200).json({
      success: true,
      message: "Transport option deleted successfully.",
    });
  } catch (error) {
    return next(new AppError("Internal Server Error", 500));
  }
};

// Calculate total carbon emissions for a combination of transport options
export const calculateCarbonEmission = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { transportIds } = req.body;

    // Validate input
    if (!Array.isArray(transportIds) || transportIds.length === 0) {
      return next(
        new AppError("Please provide a valid array of transport IDs.", 400)
      );
    }

    // Fetch transport options by IDs
    const transportOptions = await TransportOption.find({
      _id: { $in: transportIds },
    });

    if (transportOptions.length === 0) {
      return next(
        new AppError("No transport options found for the provided IDs.", 404)
      );
    }

    // Calculate totals
    const totalCarbonEmission = transportOptions.reduce(
      (sum, option) => sum + option.carbonEmission,
      0
    );
    const totalCost = transportOptions.reduce(
      (sum, option) => sum + option.cost,
      0
    );
    const totalTime = transportOptions.reduce(
      (sum, option) => sum + option.time,
      0
    );

    res.status(200).json({
      success: true,
      message: "Carbon emissions calculated successfully.",
      data: {
        totalCarbonEmission,
        totalCost,
        totalTime,
        transportOptions,
      },
    });
  } catch (error) {
    console.error("Error calculating carbon emissions:", error);
    return next(new AppError("Internal Server Error", 500));
  }
};

// Suggest the best transport option based on user preferences
export const suggestTransportOption = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { preference } = req.body;

    // Validate input
    if (!preference) {
      return next(
        new AppError(
          "Please provide a preference: 'cost', 'time', or 'carbonEmission'",
          400
        )
      );
    }

    // Validate preference type
    const validPreferences = ["cost", "time", "carbonEmission"];
    if (!validPreferences.includes(preference)) {
      return next(
        new AppError(
          "Invalid preference. Choose between 'cost', 'time', or 'carbonEmission'",
          400
        )
      );
    }

    // Find the best transport option based on preference
    const bestOption = await TransportOption.find({})
      .sort({ [preference]: 1 }) // Sort ascending based on preference
      .limit(1);

    if (!bestOption || bestOption.length === 0) {
      return next(new AppError("No transport options found", 404));
    }

    res.status(200).json({
      success: true,
      message: `Best transport option based on ${preference}`,
      data: bestOption[0],
    });
  } catch (error) {
    console.error("Error suggesting transport option:", error);
    return next(new AppError("Internal Server Error", 500));
  }
};

// POST /api/transport/integration
export const integrateTransportOptions = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { format } = req.body;

    // Validate the format
    if (!format || typeof format !== "string") {
      return next(new AppError("Invalid format type", 400));
    }

    // Fetch all transport options
    const transportOptions = await TransportOption.find();

    if (transportOptions.length === 0) {
      return next(new AppError("No transport options available.", 404));
    }

    // Format the response
    let formattedResponse;
    if (format === "google-maps") {
      formattedResponse = transportOptions.map((option) => ({
        name: option.name,
        cost: option.cost,
        time: option.time,
        carbonEmission: option.carbonEmission,
      }));
    } else {
      return next(new AppError("Unsupported format type.", 400));
    }

    // Return public data
    return res.status(200).json({
      success: true,
      message: "Integration data formatted successfully.",
      data: formattedResponse,
    });
  } catch (error) {
    console.error("Error in integrateTransportOptions:", error);
    return next(new AppError("Internal Server Error", 500));
  }
};
