import express from "express";
import { createAppointment, getAllAppointments, lookupAppointment, updateAppointmentStatus, rescheduleAppointment } from "../controllers/appointment.controller.js";
import { protectAdmin } from "../middleware/auth.middleware.js";

const router = express.Router();

//Public Operational Patient Gateways
router.post("/", createAppointment);
router.get("/lookup/:bookingId", lookupAppointment);
router.put("/reschedule/:bookingId", rescheduleAppointment);

//Firewall Protected Admin Operations
router.get("/", protectAdmin, getAllAppointments);
router.patch("/:id/status", protectAdmin, updateAppointmentStatus);

export default router;