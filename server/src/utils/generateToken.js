import jwt from "jswonwebtoken";

const generateToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET,{
        expiresIn: "1d",
    });
};

export default generateToken;