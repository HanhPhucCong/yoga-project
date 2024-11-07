const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your_jwt_secret_key';

const authenticateToken = (req, res, next) => {
    // Lấy token từ header 'Authorization'
    const token = req.headers['authorization']?.split(' ')[1]; // Lấy token từ 'Bearer <token>'

    if (!token) {
        return res.status(401).json({ message: 'Token is required' });
    }

    // Giải mã token và gán thông tin người dùng vào req.user
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid or expired token' });
        }

        // Gán thông tin user vào req.user
        req.user = decoded; // Token chứa thông tin userId, role, name
        // console.log('Decoded user:', req.user);
        next();
    });
};

module.exports = authenticateToken;
