import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import appointmentRoutes from "./routes/appointment.routes.js";
// import adminRoutes from "./routes/admin.routes.js"; //New
import doctorRoutes from "./routes/doctor.routes.js"; //New
import cookieParser from "cookie-parser";
import patientRoutes from './routes/patient.routes.js';

const app = express();

// CORS configuration must allow credentials for HttpOnly cookies to pass through
app.use(
  cors({
    origin: "http://localhost:5173", // Your React App URL
    credentials: true, // Essential for passing HttpOnly cookies
  }),
);

//body parsing middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser()); // Enable cookie parsing

//Routing mounts
app.use("/api/auth", authRoutes);
app.use("/api/appointments", appointmentRoutes); //Hooked up successfully
// app.use("/api/admin", adminRoutes); // /api/admin/dashboard
app.use("/api/doctor", doctorRoutes); // /api/doctor

//Mount the patient routes
app.use('/api/patients', patientRoutes);

//catch-all 404 route handler
app.use((req, res)=>{
    res.status(404).json({
        success: false,
        manage: `Resources Not Found: ${req.originalUrl}`
    })
})

export default app;