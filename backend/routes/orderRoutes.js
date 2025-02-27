import express from "express";
import { createOrder, getMyOrders, getAllOrders, updateOrderStatus } from "../controllers/orderController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(protect, createOrder).get(protect, admin, getAllOrders);
router.route("/myorders").get(protect, getMyOrders);
router.route("/:id/status").put(protect, admin, updateOrderStatus);


import Razorpay from "razorpay";
import dotenv from "dotenv";
dotenv.config();
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });
  
  router.post("/create-razorpay-order", async (req, res) => {
    try {
      const { amount } = req.body;
  
      const order = await razorpay.orders.create({
        amount: amount * 100, // Convert to paisa
        currency: "INR",
        payment_capture: 1,
      });
  
      res.json(order);
    } catch (error) {
      console.error("Razorpay Order Error:", error);
      res.status(500).json({ error: "Failed to create Razorpay order" });
    }
  });



export default router;
