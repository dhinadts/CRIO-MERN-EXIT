const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({ message: 'No token provided' });
    }

    // Expect "Bearer <token>"
    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Invalid token format' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid token' });
        }
        req.user = decoded;
        next();
    });
}





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
