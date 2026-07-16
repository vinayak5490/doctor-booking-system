import Admin from "../models/Admin.js";

const seedAdmin = async() => {
    try{
        const name = process.env.SEED_ADMIN_NAME;
        const email = process.env.SEED_ADMIN_EMAIL;
        const password = process.env.SEED_ADMIN_PASSWORD;

        if(!name || !email || !password){
            console.warn("Seeding skipped: Root admin credentials are missing from environment variables.");
            return;
        }

        const existingAdmin = await Admin.findOne({email});

        if(!existingAdmin){
            await Admin.create({
                name,
                email,
                password,
            });
            console.log(`Database seeded: Admin user (${email}) successfully created`);
        }else{
            console.log("Database check: Admin user already exists. Seeding skipped");
        }
    }catch(err){
        console.error("Failed to seed admin user:", err.message);
    }
}

export default seedAdmin;