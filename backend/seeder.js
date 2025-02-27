import mongoose from "mongoose";
import dotenv from "dotenv";
import users from "./data/users.js";
import User from "./models/userModel.js";

dotenv.config();

const importData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await User.deleteMany(); // Purane users delete
    const createdUsers = await User.insertMany(users); // Naye users insert
    console.log("✅ Users Seeded!");
    console.log(createdUsers);
    process.exit();
  } catch (err) {
    console.error("❌ Error seeding users:", err);
    process.exit(1);
  }
};

importData();
