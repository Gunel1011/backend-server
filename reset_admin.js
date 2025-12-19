const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("./models/user");
require("dotenv").config();

mongoose.connect(process.env.MONGODB_URI)
    .then(async () => {
        console.log("Connected to DB");
        const email = "admin@example.com";
        const password = "admin123";
        const hashedPassword = bcrypt.hashSync(password, 10);

        // Try to update first
        const updated = await User.findOneAndUpdate(
            { email },
            {
                password: hashedPassword,
                role: 'admin',
                isActive: true,
                // Ensure other fields are present if it's a new schema validation
                name: "Admin",
                surname: "User"
            },
            { new: true }
        );

        if (updated) {
            console.log("✅ Admin password reset to: admin123");
        } else {
            // Create if not exists
            const newUser = new User({
                name: "Admin",
                surname: "User",
                email,
                password: hashedPassword,
                role: "admin",
                isActive: true
            });
            await newUser.save();
            console.log("✅ Admin user created with password: admin123");
        }
        mongoose.connection.close();
    })
    .catch(err => {
        console.error(err);
        mongoose.connection.close();
    });
