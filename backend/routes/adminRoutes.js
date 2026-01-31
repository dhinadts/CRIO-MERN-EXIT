const express = require('express');
const { verifyToken, isHR } = require('../middleware/authMiddleware');
const { viewResignations, concludeResignation, viewResponses } = require('../controllers/adminController');

const router = express.Router();

router.get('/resignations', verifyToken, isHR, viewResignations);
router.put('/conclude_resignation', verifyToken, isHR, concludeResignation);
router.get('/exit_responses', verifyToken, isHR, viewResponses);

module.exports = router;
