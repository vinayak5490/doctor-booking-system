import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";

const app = express();

//Set up cross-origin sharing rules
app.use(cors());

//body parsing middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Routing mounts
app.use("/api/auth", authRoutes);

//catch-all 404 route handler
app.use((req, res)=>{
    res.status(404).json({
        success: false,
        manage: `Resoureces Not Found: ${req.originalUrl}`
    })
})

export default app;