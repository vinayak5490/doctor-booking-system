import Admin from "../models/Admin.js";
import generateToken from "../utils/generateToken.js";

// @desc    Admin authentication & HttpOnly Cookie generation
// @route   POST /api/auth/login
// @access  Public
export const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });

    if (admin && (await admin.comparePassword(password))) {
      const token = generateToken({ id: admin._id });

      //cookie options
      const cookieOptions = {
        httpOnly: true, //prevent client-side js from reading the cookie
        secure: process.env.NODE_ENV === "production", //only require https in production
        // Allow cross-site cookies in production (when client and API are on different origins)
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        maxAge: 24 * 60 * 60 * 1000, //1 day
      };

      res
        .cookie("adminToken", token, cookieOptions)
        .status(200)
        .json({
          success: true,

          message: "Authentication successful.",
          admin: {
            id: admin._id,
            name: admin.name,
            email: admin.email,
          },
        });
    } else {
      res.status(401).json({
        success: false,
        message: "Invalid administrative email or security password.",
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: `Internal Server Error: ${error.message}`,
      });
  }
};

// @desc    Check auth status on page refresh
// @route   GET /api/auth/me
// @access  Protected
export const getMe = async (req, res) => {
  res.status(200).json({
    success: true,
    admin: req.admin,
  });
};

// @desc    Admin Logout (Clear Cookie)
// @route   POST /api/auth/logout
// @access  Public
export const adminLogout = async (req, res) => {
  res.cookie("adminToken", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    expires: new Date(0), //Expire cookie immediately
  });

  res.status(200).json({
    success: true,
    message: "Logged out successfully.",
  });
};
