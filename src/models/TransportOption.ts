import { Schema, model } from "mongoose";

const TransportOptionSchema = new Schema(
  {
    name: { type: String, required: true }, // e.g., Bus, Train, Walk
    cost: { type: Number, required: true }, // e.g., ticket price
    time: { type: Number, required: true }, // travel time in minutes
    carbonEmission: { type: Number, required: true }, // emission in kg
  },
  { timestamps: true },
);

const TransportOption = model("TransportOption", TransportOptionSchema);
export default TransportOption;
