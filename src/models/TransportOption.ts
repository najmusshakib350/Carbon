import mongoose, { Schema, Document } from "mongoose";

// Interface for Transport Option
export interface ITransportOption extends Document {
  mode: string;
  carbonEmission: number;
  cost: number;
  travelTime: number;
  description?: string;
}

// Schema Definition
const TransportOptionSchema: Schema = new Schema(
  {
    mode: { type: String, required: true },
    carbonEmission: { type: Number, required: true },
    cost: { type: Number, required: true },
    travelTime: { type: Number, required: true },
    description: { type: String },
  },
  { timestamps: true }
);

// Model
const TransportOption = mongoose.model<ITransportOption>(
  "TransportOption",
  TransportOptionSchema
);

export default TransportOption;
