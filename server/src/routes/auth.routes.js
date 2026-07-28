import express from "express";
import { adminLogin, adminLogout, getMe } from "../controllers/auth.controller.js";
import { protectAdmin } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/login", adminLogin);
router.post("/logout", adminLogout);
router.get("/me", protectAdmin, getMe);

export default router;