import dbConnection from '../config/db-connection.js';

/**
 * Obtener todos los clientes.
 */
export async function getAllCustomers() {
    const [rows] = await dbConnection.query('SELECT * FROM customers');
    return rows;
}

/**
 * Obtener el número total de clientes.
 */
export async function countAllCustomers() {
    const query = 'SELECT COUNT(*) AS total FROM customers';
    const [rows] = await dbConnection.query(query);
    return rows[0].total;
}

/**
 * Obtener los clientes paginados.
 */
export async function getPaginatedCustomers(limit, offset) {
    const query = 'SELECT * FROM customers LIMIT ? OFFSET ?';
    const [rows] = await dbConnection.query(query, [parseInt(limit), parseInt(offset)]);
    return rows;
}

/**
 * Filtrar clientes por búsqueda con paginación.
 */
export async function searchCustomers(search, limit, offset) {
    const query = `
        SELECT * FROM customers
        WHERE document_number LIKE ?
        OR first_name LIKE ?
        OR last_name LIKE ?
        LIMIT ? OFFSET ?
    `;
    const [rows] = await dbConnection.query(query, [`%${search}%`, `%${search}%`, `%${search}%`, parseInt(limit), parseInt(offset)]);
    return rows;
}

/**
 * Contar el total de clientes filtrados.
 */
export async function countFilteredCustomers(search) {
    const query = `
        SELECT COUNT(*) AS total FROM customers
        WHERE document_number LIKE ?
        OR first_name LIKE ?
        OR last_name LIKE ?
    `;
    const [rows] = await dbConnection.query(query, [`%${search}%`, `%${search}%`, `%${search}%`]);
    return rows[0].total;
}

/**
 * Crear un nuevo cliente.
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
    return rows[0];
}

/**
 * Eliminar un cliente por su ID.
 */
export async function deleteCustomerById(id) {
    const query = 'DELETE FROM customers WHERE id = ?';
    await dbConnection.query(query, [id]);
}

/**
 * Update an existing customer by ID.
 */
export async function updateCustomer(id, { document_type, document_number, first_name, last_name, phone_number, address_street, email }) {
    const query = `
        UPDATE customers
        SET document_type = ?, document_number = ?, first_name = ?, last_name = ?, phone_number = ?, address_street = ?, email = ?, update_up = NOW()
        WHERE id = ?
    `;
    await dbConnection.query(query, [document_type, document_number, first_name, last_name, phone_number, address_street, email, id]);
}
