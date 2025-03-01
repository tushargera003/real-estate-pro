import express from "express";
import { getUsers, deleteUser, getOrders, updateOrderStatus, getServices, addService, deleteService ,analytics , toggleAdmin , toggleActiveService , getAllContactMessages , updateService} from "../controllers/adminController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";
import Service from "../models/serviceModel.js";
import multer from "multer";
const upload = multer();
const router = express.Router();

// Users Routes
router.get("/users", protect, adminOnly, getUsers);
router.delete("/users/:id", protect, adminOnly, deleteUser);

// Orders Routes
router.get("/orders", protect, adminOnly, getOrders);
router.put("/orders/:id", protect, adminOnly, updateOrderStatus);

// Services Routes
router.get("/services", protect, adminOnly, getServices);
router.post("/services", protect, adminOnly, addService);
router.delete("/services/:id", protect, adminOnly, deleteService);
router.patch("/services/:id", protect, adminOnly,toggleActiveService);

router.get("/analytics", protect, adminOnly, analytics);
router.put("/toggle-admin/:id", protect, adminOnly, toggleAdmin);
router.put("/services/:id",protect,adminOnly,updateService);

router.get("/getAllContactMessages", protect, adminOnly, getAllContactMessages);
export default router;
