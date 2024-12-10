import { Router } from "express";

const router = Router();

// Default route
router.get("/", (req, res) => {
  res.json({ message: "Welcome to the Transport Options API!" });
});

// Example route to fetch transport options
router.get("/options", (req, res) => {
  res.json({
    message: "Fetching transport options...",
    data: [],
  });
});

export default router;
