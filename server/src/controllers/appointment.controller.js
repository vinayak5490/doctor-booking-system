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

// @desc    Get All Appointments (With Search & Status Filters)
// @route   GET /api/appointments
// @access  Protected (Admin Only)

export const getAllAppointments = async(req, res)=>{
    try {
        const { status, search } = req.query;
        let queryEngine = {};
        if(status && status !== "All"){
            queryEngine.status = status;
        }

        if(search){
            queryEngine.$or = [
                {patientName: {$regex: search, $options: "i"}},
                {phone: {$regex: search, $options: "i"}},
                {bookingId: {$regex: search, $options: "i"}},
            ];
        }

        const records = await Appointment.find(queryEngine).sort({ createdAt: -1});
        res.status(200).json({success: true, count: records.length, date: records});
    } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }
};

// @desc    Lookup Single Appointment
// @route   GET /api/appointments/:bookingId
// @access  Public

export const lookupAppointment = async(req, res)=>{
    try {
        const record = await Appointment.findOne({bookingId: req.params.bookingId});
        if(!record){
            return res.status(404).json({success: false, message: "Appointment record not found"});
        }
        res.status(200).json({success: true, data: record});
    } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }
};

// @desc    Modify Appointment Status Inline
// @route   PATCH /api/appointments/:id/status
// @access  Protected (Admin Only)

export const updateAppointmentStatus = async (req, res)=>{
    try {
        const { status } = req.body;
        const record = await Appointment.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true, runValidators: true}
        )

        if(!record){
            return res.status(404).json({success: false, message: "Record targets not found."});
        }
        res.status(200).json({success: true, message: `Status updated to ${status}.`, data: record});
    } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }
};


// @desc    Reschedule Booking
// @route   PUT /api/appointments/reschedule/:bookingId
// @access  Public
export const rescheduleAppointment = async (req, res)=>{
    try {
        const { data, slot } = req.body;

        //Conflict validation logic
        const conflict = await Appointment.findOne({date, slot, status: {$ne: "Cancelled"}});
        if(conflict){
            return res.status(400).json({success: false, message: "Target slot is unavailable."});
        }

        const updatedRecord = await Appointment.findOneAndUpdate(
            {bookingId: req.params.bookingId},
            {date, slot, status: "Pending"},
            {new: true}
        );
        if(!updatedRecord){
            return res.status(404).json({success: false, message: "Active record identifier missing."});
        }
        res.status(200).json({success: true, message: "Rescheduled successfully.", data: updatedRecord})
    } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }
}