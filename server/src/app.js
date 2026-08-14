import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import appointmentRoutes from "./routes/appointment.routes.js";
// import adminRoutes from "./routes/admin.routes.js"; //New
import doctorRoutes from "./routes/doctor.routes.js"; //New
import settingsRoutes from "./routes/settings.routes.js";
import cookieParser from "cookie-parser";
import patientRoutes from "./routes/patient.routes.js";

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  process.env.CLIENT_URL, // e.g., https://doctor-booking-system-nu.vercel.app
  "https://doctor-booking-system-nu.vercel.app",
].filter(Boolean);

// CORS configuration must allow credentials for HttpOnly cookies to pass through
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps, curl, or Postman)
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("CORS policy violation"));
    },
    credentials: true, // Essential for HttpOnly cookies
  }),
);

//body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // Enable cookie parsing

//Routing mounts
app.use("/api/auth", authRoutes);
app.use("/api/appointments", appointmentRoutes); //Hooked up successfully
// app.use("/api/admin", adminRoutes); // /api/admin/dashboard
app.use("/api/doctor", doctorRoutes); // /api/doctor
app.use("/api/settings", settingsRoutes);

//Mount the patient routes
app.use("/api/patients", patientRoutes);

//catch-all 404 route handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    manage: `Resources Not Found: ${req.originalUrl}`,
  });
});

export default app;
