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
        req.user = decoded; // Guardar la información del usuario en el request
        next(); // Continuar al siguiente middleware o controlador
    } catch (error) {
        return res.status(401).json({ error: 'Token inválido o expirado' });
    }
}
