import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import transportRoutes from "./routes/transportRoutes"; // Import routes

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

// Routes
app.use("/api/transport", transportRoutes); // Mount transport routes

app.get("/", (req, res) => {
  res.send("Welcome to the Transport Emissions API");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
