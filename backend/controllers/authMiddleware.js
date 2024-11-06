const jwt = require('jsonwebtoken');

// Middleware xác thực token
const verifyToken = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Lưu thông tin user từ token vào req.user để sử dụng sau này
        next();
    } catch (err) {
        res.status(400).json({ message: 'Invalid token.' });
    }
};

// Middleware kiểm tra role
const verifyRole = (roles) => (req, res, next) => {
    if (!roles.includes(req.user.role)) {
        return res.status(403).json({ message: 'Access denied. You do not have permission.' });
    }
    next();
};

module.exports = { verifyToken, verifyRole };
