import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                message: "Authentication required",
                success: false,
            });
        }
        
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        if (!decode) {
            return res.status(401).json({
                message: "Invalid token",
                success: false
            });
        }
        
        req.id = decode.userId;
        next();
    } catch (error) {
        console.error('Authentication error:', error);
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                message: "Invalid token",
                success: false
            });
        }
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                message: "Token expired, please login again",
                success: false
            });
        }
        return res.status(500).json({
            message: "Authentication failed",
            success: false
        });
    }
};

export default isAuthenticated;