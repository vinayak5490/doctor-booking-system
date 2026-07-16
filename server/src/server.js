import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import connectDB from "./config/db.js";
import seedAdmin from "./config/seedAdmin";

const PORT = process.env.PORT || 5000;

const startServer = async ()=>{
    //Initialize MongoDB Database Connection
    await connectDB();

    //Seed Default Operational Admin Account
    await seedAdmin();

    //Turn on express engine listeners
    app.listen(PORT, ()=>{
        console.log(`control center server active on https://localhost:${PORT}`);
    });
};

startServer();