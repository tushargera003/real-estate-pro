import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    services: [
      {
        service: { type: mongoose.Schema.Types.ObjectId, ref: "Service", required: true },
        width: { type: Number, required: true },
        length: { type: Number, required: true },
        documentUrl: { type: String },
        price: { type: Number, required: true },
      },
    ],
    paymentMethod: { type: String, required: true },
    isPaid: { type: Boolean, default: false },
    paymentId: { type: String }, 
    status: { type: String, default: "Pending", enum: ["Pending", "Processing", "Completed", "Cancelled"] },
  },
  { timestamps: true }
);


const Order = mongoose.model("Order", orderSchema);
export default Order;
