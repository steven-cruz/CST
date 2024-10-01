import jwt from 'jsonwebtoken';
import 'dotenv/config';

const JWT_SECRET = process.env.JWT_SECRET;

export function verifyToken(req, res, next) {
    const token = req.cookies?.token;

    if (!token) {
        return res.redirect('/');
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;

        if (req.accepts('html')) {
            res.setHeader('Cache-Control', 'no-store');
            res.setHeader('Pragma', 'no-cache');
            res.setHeader('Expires', '0');
        }

        next();
    } catch (error) {
        return res.redirect('/');
    }
}
