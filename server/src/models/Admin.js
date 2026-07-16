import mongoose from "mongoose";
import bcrypt from "bcrypt";

const adminSchema = new mongoose.Schema(
    {name : {
        type: String,
        required: true,
        trim:true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password:{
        type: String,
        required: true,
    },
},
{timestamps: true}
);

//Pre-save hashing hook
adminSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next();
    try{
        const salt = await bcrypt.getSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch(err){
        next(err);
    }
});

adminSchema.methods.comparePassword = async function (enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
};

const Admin = mongoose.model("Admin", adminSchema);
export default Admin;