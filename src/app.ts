import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

// config dotenv
dotenv.config();

const app = express();
app.use(express.json());

// MongoDB connection
const mongoUri = process.env.MONGO_URI || "";
mongoose
  .connect(mongoUri)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.error("MongoDB Connection Error:", err);
  });

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to the Transport Emissions API");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
