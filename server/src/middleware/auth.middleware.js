import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

export const protectAdmin = async(req, res, next) =>{
    try {
        //Reach token from HttpOnly cookie
        const token = req.cookies.adminToken;

        if(!token){
            return res.status(401).json({
                success: false,
                message: "Not authorized: No authentication token found.",
            });
        }

        //verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        //Attach admin context
        req.admin = await Admin.findById(decoded.id).select("-password");

        if(!req.admin){
            return res.status(401).json({
                success: false,
                message: "Admin profile not found.",
            });
        }
    } catch (error) {
        console.error("Auth Error:", error.message);
        return res.status(401).json({
            success: false,
            message: "Not authorized: Token has expired or is invalid",
        });
    }
};