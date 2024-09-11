import mysql from 'mysql2/promise';

let connection;

try {
    connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'cst'
    });

    console.info('- Conectado a MySQL exitosamente.');
} catch (err) {
    console.error('Error en la conexión a MySQL:', err.stack);
}

export default connection;
