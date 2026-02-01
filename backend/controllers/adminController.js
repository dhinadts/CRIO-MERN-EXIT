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
        if (!resignationId) {
            return res.status(400).json({ message: 'Resignation ID required' });
        } const resignation = await Resignation.findById(resignationId);
        if (!resignation) {
            return res.status(404).json({ message: 'Resignation not found' });
        }
        resignation.approved = approved;
        resignation.lwd = lwd;
        await resignation.save();
        return res.status(200).json({ message: 'Resignation updated successfully', data: resignation });
    } catch (err) {
        console.error(err); return res.status(500).json({ message: 'Server error' });
    }
};

exports.viewResponses = async (req, res) => {
    const responses = await ExitInterview.find();
    res.json({ data: responses });
};
