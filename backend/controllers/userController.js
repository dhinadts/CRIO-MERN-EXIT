const Resignation = require('../models/Resignation');
const axios = require('axios');
const ExitInterview = require('../models/ExitInterview');
const dotenv = require('dotenv');

dotenv.config();


exports.submitResignation = async (req, res) => {
    const { lwd } = req.body;
    const employeeId = req.user.id;

    const day = new Date(lwd).getDay();
    if (day === 0 || day === 6) return res.status(400).json({ message: "Cannot resign on weekend" });
    console.log("Calendarific Key:", process.env.CALENDARIFIC_KEY);

    try {
        const { data } = await axios.get("https://calendarific.com/api/v2/holidays", {
            params: {
                api_key: process.env.CALENDARIFIC_KEY,
                country: "IN",
                year: new Date(lwd).getFullYear()
            }
        });

        const holidays = data.response.holidays.map(h => h.date.iso);
        if (holidays.includes(lwd)) {
            return res.status(400).json({ message: "Cannot resign on holiday" });
        }
    } catch (err) {
        console.error("Calendarific error:", err.response?.data || err.message);
        return res.status(500).json({ message: "Holiday validation failed" });
    }
    const username = req.user.username;
    const resignation = await Resignation.create({ employeeId, username, lastWorkingDate: lwd, status: 'pending' });
    res.json({ data: { resignation: { _id: resignation._id } } });

};

exports.submitResponses = async (req, res) => {
    const employeeId = req.user.id;
    const { responses } = req.body;
    await ExitInterview.create({ employeeId, responses });
    res.json({ message: "Responses submitted" });
};
