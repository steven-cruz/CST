import dbConnection from '../config/db-connection.js';

/**
 * Get All customers
 */
export async function getAllCustomers() {
    const [rows] = await dbConnection.query('SELECT * FROM customers');
    return rows;
}

/**
 * Create a New Customer.
 */
export async function createCustomer({ document_type, document_number, first_name, last_name, phone_number, address_street, email }) {
    const query = `
        INSERT INTO customers (document_type, document_number, first_name, last_name, phone_number, address_street, email, create_at, update_up)
        VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
    `;
    const [result] = await dbConnection.query(query, [document_type, document_number, first_name, last_name, phone_number, address_street, email]);
    return { id: result.insertId };
}

/**
 * Buscar un cliente por su ID.
 */
export async function findCustomerById(id) {
    const query = 'SELECT * FROM customers WHERE id = ?';
    const [rows] = await dbConnection.query(query, [id]);
    return rows[0]; // Retorna el primer cliente encontrado o undefined si no existe
}

/**
 * Eliminar un cliente por su ID.
 */
export async function deleteCustomerById(id) {
    const query = 'DELETE FROM customers WHERE id = ?';
    await dbConnection.query(query, [id]);
}
