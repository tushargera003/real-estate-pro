import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import serviceRoutes from "./routes/serviceRoutes.js";
import uploadRoutes from "./routes/uploads.js";
import contactRoutes from "./routes/contactRoutes.js";
import newsletterRoutes from "./routes/newsletterRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import authRoutes from "./routes/authRoutes.js";

// Configure dotenv and database
dotenv.config();
connectDB();

// Create Express app
const app = express();
app.use(express.json());
app.use(cors({
    origin: 'https://real-estate-pro-web.vercel.app',
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
    credentials: true
}));
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/services", serviceRoutes);

app.use("/api/uploads", uploadRoutes);
app.use("/api/newsletter", newsletterRoutes);


app.use("/api/admin", adminRoutes);
app.use("/api", contactRoutes);
app.use("/api/auth", authRoutes);

// Serve static files (React build)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "..", "frontend", "dist")));

// Handle client-side routing
app.get("*", (req, res) => {res.sendFile(path.join(__dirname, "..", "frontend", "dist", "index.html"));});// Start the serverconst PORT = process.env.PORT || 5000;app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));