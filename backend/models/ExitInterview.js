const mongoose = require('mongoose');

const exitInterviewSchema = new mongoose.Schema({
    employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    responses: [{ questionText: String, response: String }],
    submittedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ExitInterview', exitInterviewSchema);
