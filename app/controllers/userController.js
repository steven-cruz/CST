import { createUser, findUserByUsername } from '../models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const JWT_SECRET = process.env.JWT_SECRET;

/**
 * Controlador para crear un nuevo usuario.
 */
export async function createUserController(req, res) {
    try {
        const { first_name, last_name, username, password, email, role } = req.body;

        // Validación de campos requeridos
        if (!first_name || !last_name || !username || !password || !email || !role) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
        }

        // Validación de formato de email y contraseña
        if (!isValidEmail(email)) {
            return res.status(400).json({ error: 'El formato del correo electrónico es inválido.' });
        }
        if (!isValidPassword(password)) {
            return res.status(400).json({ error: 'La contraseña debe tener al menos 8 caracteres.' });
        }

        // Crear un nuevo usuario
        const user = await createUser({ first_name, last_name, username, password, email, role });
        res.status(201).json({ message: 'Usuario creado exitosamente', id: user.id });
    } catch (error) {
        console.error('Error al crear el usuario: ', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

/**
 * Controlador para el inicio de sesión.
 */
export async function loginUserController(req, res) {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: 'Username y password son requeridos.' });
        }

        const user = await findUserByUsername(username);

        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado.' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ error: 'Contraseña incorrecta.' });
        }

        // Generar el token JWT
        const token = jwt.sign(
            { id: user.id, username: user.username, role: user.role }, // Información contenida en el token
            JWT_SECRET, // Secreto para firmar el token
            { expiresIn: '1h' } // Tiempo de expiración del token
        );

        // Establecer la cookie con el token
        res.cookie('token', token, {
            httpOnly: true,  // Impide el acceso al token desde JavaScript
            secure: false,  // Solo enviar por HTTPS en producción
            maxAge: 3600000, // 1 hora
            sameSite: 'Strict'  // Protección contra ataques CSRF
        });

        res.status(200).json({ message: 'Inicio de sesión exitoso' });
    } catch (error) {
        console.error('Error en el inicio de sesión: ', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

/**
 * Función auxiliar para validar formato de email.
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Función auxiliar para validar la seguridad de la contraseña.
 */
function isValidPassword(password) {
    return password.length >= 8;
}
