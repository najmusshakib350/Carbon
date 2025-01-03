import mongoose from "mongoose";
import dotenv from "dotenv";
import express, { Request, Response } from "express";
import transportRoutes from "./routes/transportRoutes";
import GlobalError from "./controllers/errorcontroller";
import cors from "cors";

dotenv.config();

const app = express();
app.use(express.json());

// MongoDB connection
const mongoUri =
  process.env.MONGO_URI || "mongodb://localhost:27017/transport-emissions";
mongoose
  .connect(mongoUri)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB Connection Error:", err);
  });

// Allow all origins
app.use(cors());
// Middleware
app.use(express.json());

// Root route
app.get("/", (req: Request, res: Response): void => {
  res.status(200).json({ message: "Server is running and API is live!" });
});
// Routes
app.use("/api/transport", transportRoutes);
// Global Error handling
app.use(GlobalError);

// Start the server
const PORT: number = parseInt(process.env.PORT || "3000", 10);
app.listen(PORT, (): void => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
