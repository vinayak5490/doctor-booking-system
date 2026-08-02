import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema(
    {
        patientName: { type: String, required: true},
        age: { type: Number, required: true},
        gender: { type: String, default: 'Male'},
        phone: { type: String, required: true},
        email: { type: String },
        totalVisits: { type: Number, default: 0},
        lastVisit: { type: Date, default: Date.now },
    },
    { timestamps: true}
);

const Patient = mongoose.model('Patient', patientSchema);
export default Patient;