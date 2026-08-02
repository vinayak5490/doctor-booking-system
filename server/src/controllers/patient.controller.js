import Patient from "../models/Patient.js";

//Create New Patient Record
export const createPatient = async(req, res)=>{
    try {
        const newPatient = new Patient(req.body);
        const saved = await newPatient.save();
        res.status(201).json({ success: true, data: saved });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message});
    }
};

//Get Patients with Pagination & Search
export const getPatients = async (req, res)=>{
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const search = req.query.search || '';

        const query = search
        ?{
            $or:[
                { patientName: { $regex: search, $options: 'i'}},
                { phone: { $regex: search, $options: 'i'}},
            ],
        }
        :{};

        const total = await Patient.countDocuments(query);
        const patients = await Patient.find(query)
        .skip((page-1) * limit)
        .limit(limit)
        .sort({createdAt: -1});

        res.status(200).json({
            success: true,
            total,
            totalPages: Math.ceil(total/limit),
            page,
            data: patients,
        })
    } catch (error) {
        res.status(500).json({
            success: false, message: error.message
        })
    }
}