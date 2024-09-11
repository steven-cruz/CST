import dbConnection from '../config/db-connection.js';
import bcrypt from 'bcrypt';

// Función para crear un nuevo usuario
export async function createUser({ first_name, last_name, username, password, email, role }) {
    const saltRounds = 10;  // Definir las rondas de salt para el hash de la contraseña
    const hashedPassword = await bcrypt.hash(password, saltRounds);  // Hashear la contraseña

    const query = `
        INSERT INTO users (first_name, last_name, username, password, email, role, created_at)
        VALUES (?, ?, ?, ?, ?, ?, NOW())
    `;

    const [result] = await dbConnection.query(query, [first_name, last_name, username, hashedPassword, email, role]);
    return { id: result.insertId };
}

// Función para encontrar un usuario por su nombre de usuario
export async function findUserByUsername(username) {
    const query = 'SELECT * FROM users WHERE username = ?';
    const [rows] = await dbConnection.query(query, [username]);
    return rows[0];  // Retorna el primer usuario encontrado o undefined si no hay coincidencias
}
