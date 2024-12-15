import express from "express";
import {
  getAllTransportOptions,
  addTransportOption,
  updateTransportOption,
  deleteTransportOption,
  calculateCarbonEmission,
} from "../controllers/transportController";

const router = express.Router();

// Route: GET /api/transport/options
router.get("/options", getAllTransportOptions);

// POST a new transport option
router.post("/options", addTransportOption);
// Update an existing transport option by ID
router.patch("/options/:id", updateTransportOption);
// DELETE a transport option by ID
router.delete("/options/:id", deleteTransportOption);
// POST: Calculate carbon emissions for transport combination
router.post("/calculate", calculateCarbonEmission);

export default router;
