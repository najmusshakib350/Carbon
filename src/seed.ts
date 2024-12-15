import mongoose from "mongoose";
import TransportOption from "./models/TransportOption";

const seedTransportOptions = async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_URI || "mongodb://localhost:27017/transport-emissions",
    );

    const options = [
      { name: "Bus", cost: 50, time: 30, carbonEmission: 0.3 },
      { name: "Train", cost: 100, time: 45, carbonEmission: 0.2 },
      { name: "Walk", cost: 0, time: 60, carbonEmission: 0 },
      { name: "Car Share", cost: 150, time: 25, carbonEmission: 1.5 },
    ];

    await TransportOption.insertMany(options);
    console.log("Transport options seeded successfully");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding transport options:", error);
    process.exit(1);
  }
};

seedTransportOptions();
