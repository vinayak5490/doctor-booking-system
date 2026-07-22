import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import appointmentRoutes from "./routes/appointment.routes.js";
// import adminRoutes from "./routes/admin.routes.js"; //New
import doctorRoutes from "./routes/doctor.routes.js"; //New

const app = express();

//Set up cross-origin sharing rules
app.use(cors());

//body parsing middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Routing mounts
app.use("/api/auth", authRoutes);
app.use("/api/appointments", appointmentRoutes); //Hooked up successfully
// app.use("/api/admin", adminRoutes); // /api/admin/dashboard
app.use("/api/doctor", doctorRoutes); // /api/doctor

//catch-all 404 route handler
app.use((req, res)=>{
    res.status(404).json({
        success: false,
        manage: `Resources Not Found: ${req.originalUrl}`
    })
})

export default app;