import Admin from "../models/Admin.js";
import generateToken from "../utils/generateToken.js";

export const adminLogin = async(req, res) =>{
    const { email, password } = req.body;

    try {
        const admin = await Admin.findOne({email});

        if(admin && (await admin.comparePassword(password))){
            res.status(200).json({
                success: true,
                message: "Authentication successful",
                token: generateToken({id: admin._id}),
                admin:{
                    id: admin._id,
                    name: admin.name,
                    email: admin.email,
                },
            });
        }else{
            res.status(401).json({success: false, message: "Invalid administrative email or security password."});
        }
    } catch (error) {
        res.status(500).json({success: false, message: `Internal Server Error: ${error.message}`});
    }
}