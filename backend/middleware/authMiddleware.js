const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({ message: 'No token provided' });
    }

    // Accept "Bearer <token>" or raw "<token>"
    const token = authHeader.startsWith('Bearer ')
        ? authHeader.split(' ')[1]
        : authHeader;

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid token' });
        }
        req.user = decoded;
        next();
    });
}
module.exports.verifyToken = verifyToken;
function verifyAdmin(req, res, next) {
    if (req.user.role !== 'HR') {
        return res.status(403).json({ message: 'Forbidden: Admins only' });
    } next();
}

module.exports.verifyAdmin = verifyAdmin;
// Restrict to Employees only
exports.isEmployee = (req, res, next) => {
    if (req.user.role !== "Employee") {
        return res.status(403).json({ message: "Access denied: Employees only" });
    }
    next();
};

// Restrict to HR only
exports.isHR = (req, res, next) => {
    if (req.user.role !== "HR") {
        return res.status(403).json({ message: "Access denied: HR only" });
    }
    next();
};
