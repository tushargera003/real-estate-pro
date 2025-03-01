import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    priceType: {
      type: String,
      enum: ["fixed", "perUnit"], // Fixed price or per unit (length/width)
      default: "fixed",
    },
    document: {
      type: String, // Document URL
    },
    images: {
      type: [String], // Array of image URLs
    },
    active: {
      type: Boolean,
      default: true,
    },
    requiresDimensions: {
      type: Boolean,
      default: false, // Default: Dimensions not required
    },
    requiresDocument: {
      type: Boolean,
      default: false, // Default: Document not required
    },
  },
  {
    timestamps: true,
  }
);

const Service = mongoose.model("Service", serviceSchema);

export default Service;