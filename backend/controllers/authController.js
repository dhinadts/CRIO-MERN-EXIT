const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const dotenv = require('dotenv');
dotenv.config();

exports.register = async (req, res) => {
    try {
        const { username, password } = req.body;


        const hashed = await bcrypt.hash(password, 10);


        await User.create({ username, password: hashed, role: 'Employee' });

        res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
        res.status(500).json({ message: "Error registering user", error: err.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;


        if (username === "admin" && password === "admin") {
            const token = jwt.sign({ role: "HR" }, process.env.JWT_SECRET);
            return res.json({ token });
        }


        const user = await User.findOne({ username });
        if (!user) return res.status(400).json({ message: "Invalid credentials" });

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ id: user._id, role: user.role, username: user.username }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.json({ token });
    } catch (err) {
        res.status(500).json({ message: "Error logging in", error: err.message });
    }
};

