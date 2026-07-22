import Doctor from "../models/Doctor.js";

// @desc    Get Doctor Profile (Public & Admin)
// @route   GET /api/doctor
// @access  Public

export const getDoctorProfile = async(req, res)=>{
    try {
        // Fetch the primary doctor profile or return a default record if empty
        let doctor = await Doctor.findOne();
        if(!doctor){
            doctor = await Doctor.create({
                name: "Dr. Arjun Mehta",
                qualification: "MBBS, MD (cardiology)",
                specialization: "Senior Cardiologist",
                experience: 12,
                consultationFee: 800,
            });
        }
        res.status(200).json({success: true, data: doctor});
    } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }
};

// @desc    Update Doctor Profile
// @route   PUT /api/doctor
// @access  Protected (Admin Only)
export const updateDoctorProfile = async (req, res)=>{
    try {
        let doctor = await Doctor.findOne();
        if(!doctor){
            doctor = await Doctor.create(req.body);
        }else{
            doctor = await Doctor.findByIdAndUpdate(doctor._id, req.body, {
                new: true,
                runValidators: true,
            });
        }
        res.status(200).json({
            success: true,
            message: "Doctor profile update successfully",
            data: doctor,
        });
    } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }
}