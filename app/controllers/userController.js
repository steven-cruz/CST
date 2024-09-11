import { createUser, findUserByUsername } from '../models/userModel.js';
import bcrypt from 'bcrypt';

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

        // Si el login es exitoso, se puede iniciar una sesión o retornar un token JWT, etc.
        res.status(200).json({ message: 'Inicio de sesión exitoso', user: { id: user.id, username: user.username, role: user.role } });
    } catch (error) {
        console.error('Error en el inicio de sesión: ', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}
