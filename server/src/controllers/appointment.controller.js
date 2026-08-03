import Appointment from "../models/Appointment.js";
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
// @route   GET /api/appointments/search?query=9876543210
// @access  Public

export const lookupAppointment = async(req, res)=>{
    try {
        // console.log("Incoming query:", req.query.query)
        const { query } = req.query;
        if(!query){
            return res.status(400).json({
                success: false,
                message: "Search query is required",
            });
        }

        //Booking ID search
        if(query.toUpperCase().startsWith("APT-")){
            const appointment = await Appointment.findOne({
                bookingId: query.toUpperCase(),
            });

            if(!appointment){
                return res.status(404).json({
                    success: false,
                    message: "Appointment not found",
                });
            }

            return res.status(200).json({
                success: true,
                type: "bookingId",
                data: appointment,
            });
        }

        //Phone Number search
        const appointments = await Appointment.findOne({
            phone: query,
        }).sort({ createdAt: -1});

        if(appointments.length === 0){
            return res.status(404).json({
                success: false,
                message: "No appointments found",
            });
        }
        res.status(200).json({
            success: true,
            type: "phone",
            data: appointments,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    };
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
        const { date, slot } = req.body;

        if(!date || !slot){
            return res.status(400).json({
                success: false,
                message: "Date and slot are required."
            })
        }

        const appointment = await Appointment.findOne({
            bookingId: req.params.bookingId
        });

        if(!appointment){
            return res.status(404).json({
                success: false,
                message: "Appointment not found."
            });
        }

        if(appointment.status === "Cancelled"){
            return res.status(400).json({
                success: false,
                message: "Cancelled appointments cannot be rescheduled."
            });
        }

        const conflict = await Appointment.findOne({
            date,
            slot,
            status: { $ne : "Cancelled"},
            _id : { $ne: appointment._id}
        });

        if(conflict){
            return res.status(400).json({
                success: false,
                message: "Target slot is unavailable."
            });
        }

        appointment.date = date;
        appointment.slot = slot;
        appointment.status = "Pending";

        await appointment.save();

        res.status(200).json({
            success: true,
            message: "Reschedule successfully.",
            data: appointment
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

// @desc    Cancel Appointment
// @route   PUT /api/appointments/cancel/:bookingId
// @access  Public

export const cancelAppointment = async (req, res) =>{
    try {
        const { bookingId } = req.params;
        // const { reason } = req.body;

        const appointment = await Appointment.findOne({ bookingId });

        if(!appointment){
            return res.status(404).json({
                success: false,
                message: "Appointment not found."
            });
        }

        if (appointment.status === "Cancelled") {
          return res.status(400).json({
            success: false,
            message: "Appointment is already cancelled.",
          });
        }

        if (appointment.status === "Completed") {
          return res.status(400).json({
            success: false,
            message: "Completed appointments cannot be cancelled.",
          });
        }

        appointment.status = "Cancelled";
        
        await appointment.save();

        res.status(200).json({
            success: true,
            message: "Appointment cancelled successfully.",
            data: appointment
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        })
    }
}
// Get Dashboard Aggregated Analytics
export const getDashboardStats = async (req, res) => {
  try {
    // 1. Calculate Start and End of Today in UTC
    const todayStart = new Date();
    todayStart.setUTCHours(0, 0, 0, 0);

    const todayEnd = new Date();
    todayEnd.setUTCHours(23, 59, 59, 999);

    // 2. Fetch counts concurrently
    const [todaysCount, upcomingCount, completedCount, cancelledCount] =
      await Promise.all([
        // Today's appointments (Date object OR String match)
        Appointment.countDocuments({
          $or: [
            { date: { $gte: todayStart, $lte: todayEnd } },
            { date: { $gte: todayStart.toISOString(), $lte: todayEnd.toISOString() } },
          ],
        }),

        // Upcoming bookings (strictly after todayEnd, excluding cancelled)
        Appointment.countDocuments({
          $or: [
            { date: { $gt: todayEnd } },
            { date: { $gt: todayEnd.toISOString() } },
          ],
          status: { $ne: 'Cancelled' },
        }),

        // Completed sessions
        Appointment.countDocuments({ status: 'Completed' }),

        // Cancelled requests
        Appointment.countDocuments({ status: 'Cancelled' }),
      ]);

    res.status(200).json({
      success: true,
      data: {
        todaysCount,
        upcomingCount,
        completedCount,
        cancelledCount,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
// Get Today's Appointments Queue
export const getTodaysAppointments = async (req, res) => {
  try {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const appointments = await Appointment.find({
      date: { $gte: startOfDay, $lte: endOfDay }
    }).sort({ slot: 1 });

    res.status(200).json({
      success: true,
      data: appointments
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};