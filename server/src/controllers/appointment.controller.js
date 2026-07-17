import Appointment from "../models/Appointment";
// @desc    Book an Appointment
// @route   POST /api/appointments
// @access  Public

export const createAppointment = async (req, res)=>{
    try{
        const { patientName, phone, email, age, gender, symptoms, date, slot } = req.body;
        //check if slot conflict exist on the specific date configuration
        const existingConflict = await Appointment.findOne({date, slot, status: {$ne: "Cancelled"}});
        if(existingConflict){
            return res.status(400).json({success: false, message: "This operational slot is already booked."});
        }

        const newAppointment = await Appointment.create({
            patientName,
            phone,
            email,
            age,
            gender,
            symptoms,
            date,
            slot
        });

        res.status(201).json({success: true, message: "Appointment required successfully.", data: newAppointment});
    }catch(error){
        res.status(500).json({success: false, message: error.message});
    }
}