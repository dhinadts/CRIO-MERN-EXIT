const User = require('../models/User');
const bcrypt = require('bcryptjs');

async function seedAdmin() {
    try {
        const existingAdmin = await User.findOne({ username: "admin" });
        if (!existingAdmin) {
            const hashed = await bcrypt.hash("admin", 10);
            await User.create({
                username: "admin",
                password: hashed,
                role: "HR"
            });
            console.log(" Admin account seeded (admin/admin)");
        } else {
            console.log(" Admin account already exists");
        }
    } catch (err) {
        console.error("Error seeding admin:", err.message);
    }
}
module.exports = seedAdmin;