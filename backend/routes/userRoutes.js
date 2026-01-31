const express = require('express');
const { verifyToken, isEmployee } = require('../middleware/authMiddleware');
const { submitResignation, submitResponses } = require('../controllers/userController');

const router = express.Router();

router.post('/resign', verifyToken, isEmployee, submitResignation);
router.post('/responses', verifyToken, isEmployee, submitResponses);

module.exports = router;
