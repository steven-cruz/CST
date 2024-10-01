import mysql from 'mysql2/promise';
import 'dotenv/config';

let connection;

try {
    connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    });

    console.info('- Conectado a MySQL exitosamente.');
} catch (err) {
    console.error('Error en la conexión a MySQL:', err.stack);
}

export default connection;
