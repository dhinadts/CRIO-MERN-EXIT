const Resignation = require('../models/Resignation');
const transporter = require('../config/nodemailer');
const ExitInterview = require('../models/ExitInterview');

exports.viewResignations = async (req, res) => {
    const resignations = await Resignation.find();
    res.json({ data: resignations });
};

exports.concludeResignation = async (req, res) => {
    try {
        const { resignationId, approved, lwd } = req.body;
        const resignation = await Resignation.findById(resignationId);

        resignation.status = approved ? 'approved' : 'rejected';
        resignation.exitDate = approved ? lwd : null;
        await resignation.save();


        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: "dhinadts@gmail.com",
            subject: "Resignation Update",
            text: approved
                ? `Your resignation has been approved. Exit date: ${lwd}`
                : "Your resignation was rejected."
        });

        res.json({ message: "Resignation updated and email sent" });
    } catch (err) {
        console.error("Email error:", err);
        res.status(500).json({ message: "Error concluding resignation", error: err.message });
    }
};

exports.viewResponses = async (req, res) => {
    const responses = await ExitInterview.find();
    res.json({ data: responses });
};
