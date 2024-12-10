import { Request, Response } from "express";
import TransportOption from "../models/TransportOption";

// Fetch all transport options
export const getTransportOptions = async (req: Request, res: Response) => {
  try {
    const options = await TransportOption.find();
    res.json({ success: true, data: options });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error });
  }
};

// Add a new transport option
export const addTransportOption = async (req: Request, res: Response) => {
  try {
    const { mode, carbonEmission, cost, travelTime, description } = req.body;

    const newOption = new TransportOption({
      mode,
      carbonEmission,
      cost,
      travelTime,
      description,
    });

    const savedOption = await newOption.save();
    res.status(201).json({ success: true, data: savedOption });
  } catch (error) {
    res.status(400).json({ success: false, message: "Invalid data", error });
  }
};
