import Doctor from "../models/Doctor.js";

const normalizeDoctorPayload = (payload = {}) => {
  const normalizedPayload = { ...payload };

  if (
    normalizedPayload.fee !== undefined &&
    normalizedPayload.consultationFee === undefined
  ) {
    normalizedPayload.consultationFee = normalizedPayload.fee;
  }

  if (
    normalizedPayload.clinicAddress === undefined &&
    normalizedPayload.clinicAdress !== undefined
  ) {
    normalizedPayload.clinicAddress = normalizedPayload.clinicAdress;
  }

  if (typeof normalizedPayload.languages === "string") {
    normalizedPayload.languages = normalizedPayload.languages
      .split(",")
      .map((language) => language.trim())
      .filter(Boolean);
  }

  return normalizedPayload;
};

// @desc    Get Doctor Profile (Public & Admin)
// @route   GET /api/doctor
// @access  Public

export const getDoctorProfile = async (req, res) => {
  try {
    // Fetch the primary doctor profile or return a default record if empty
    let doctor = await Doctor.findOne();
    if (!doctor) {
      doctor = await Doctor.create({
        name: "Dr. Arjun Mehta",
        qualification: "MBBS, MD (cardiology)",
        specialization: "Senior Cardiologist",
        experience: 12,
        consultationFee: 800,
        about:
          "Dr. Arjun Mehta is a compassionate physician focused on preventive care, accurate diagnosis, and continuous patient wellness.",
        clinicAddress:
          "DocBook Executive Clinics, Sector 62, Noida, UP - 201301",
        languages: ["English", "Hindi"],
      });
    }
    res.status(200).json({ success: true, data: doctor });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update Doctor Profile
// @route   PUT /api/doctor
// @access  Protected (Admin Only)
export const updateDoctorProfile = async (req, res) => {
  try {
    const normalizedPayload = normalizeDoctorPayload(req.body);
    let doctor = await Doctor.findOne();
    if (!doctor) {
      doctor = await Doctor.create(normalizedPayload);
    } else {
      doctor = await Doctor.findByIdAndUpdate(doctor._id, normalizedPayload, {
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
    res.status(500).json({ success: false, message: error.message });
  }
};
