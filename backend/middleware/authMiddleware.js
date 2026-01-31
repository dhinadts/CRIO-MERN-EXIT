const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: "No token provided" });

    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid token" });
    }
};


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
