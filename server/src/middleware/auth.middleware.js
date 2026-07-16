import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

export const protectAdmin = async(req, res, next) =>{
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        try {
            token = req.headers.authorization.split(" ")[1];

            //Decode JWT token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            //Find admin and attach profile context (excluding sensitive password hashes)
            req.admin = await Admin.findById(decode.id).select("-password");

            if(!req.admin){
                return res.status(401).json({success: false, message: "Administratives context not found."});
            }
            // return next();
        } catch (error) {
            console.error("JWT Error:", error.message);
            return res.status(401).json({success: false, message: "Not authorized: Token signature has expired or is invalid."});
        }
    }
    if(!token){
        return res.status(401).json({success: false, message: "Not authorized: No authentication credentials provided."});
    }
};