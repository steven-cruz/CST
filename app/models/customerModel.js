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
        INSERT INTO customers (document_type, document_number, first_name, last_name, phone_number, address_street, email, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, NOW())
    `;
    const [result] = await db.query(query, [document_type, document_number, first_name, last_name, phone_number, address_street, email]);
    return { id: result.insertId };
}
