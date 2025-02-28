import express from "express";
import { registerUser, authUser, getUsers ,deleteUser} from "../controllers/userController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", authUser);
router.get("/users", protect, adminOnly, getUsers);   // ✅ Sirf admin access karega
router.delete("/user/:id", protect, adminOnly, deleteUser); // ✅ Sirf admin delete kar sakega

export default router;
