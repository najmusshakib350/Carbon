import express from "express";
import {
  getAllTransportOptions,
  addTransportOption,
} from "../controllers/transportController";

const router = express.Router();

// Route: GET /api/transport/options
router.get("/options", getAllTransportOptions);

// POST a new transport option
router.post("/options", addTransportOption);

export default router;
