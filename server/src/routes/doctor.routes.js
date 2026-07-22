import express from "express";
import { getDoctorProfile, updateDoctorProfile } from "../controllers/doctor.controller.js";
import { protectAdmin } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", getDoctorProfile);
router.put("/", protectAdmin, updateDoctorProfile);

export default router;