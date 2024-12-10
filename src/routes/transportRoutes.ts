import { Router } from "express";
import {
  getTransportOptions,
  addTransportOption,
} from "../controllers/transportController";

const router = Router();

// Fetch all transport options
router.get("/options", getTransportOptions);

// Add a new transport option
router.post("/options", addTransportOption);

export default router;
