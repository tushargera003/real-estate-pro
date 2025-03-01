import express from "express";
import Newsletter from "../models/Newsletter.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";
const router = express.Router();

// POST Route to Subscribe
router.post("/subscribe", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    // Check if email already exists
    const existingUser = await Newsletter.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already subscribed" });
    }

    // Save to DB
    const newSubscriber = new Newsletter({ email });
    await newSubscriber.save();

    res.status(201).json({ message: "Subscription successful!" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});
router.get("/subscribers", protect, adminOnly, async (req, res) => {
  try {
    const subscribers = await Newsletter.find().sort({ subscribedAt: -1 });
    res.status(200).json(subscribers);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});
export default router;
