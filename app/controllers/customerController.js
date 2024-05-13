import { getAllCustomers, createCustomer } from '../models/customerModel.js';

/**
 * Controller for Get all customers.
 */
export async function getAllCustomersController(req, res) {
    try {
        const customers = await getAllCustomers();
        res.json(customers);
    } catch (error) {
        console.error('Error al obtener usuarios: ', error);
        res.status(500).json({error: 'Error interno del servidor.'});
    }
}

/**
 * Controller for Create news customers.
 */
export async function createCustomerController(req, res) {
    try {
        const customerData = req.body;
        const result = await createCustomer(customerData);
        res.status(201).json({ id: result.id });
    } catch (error) {
        console.error('Error al crear el cliente: ', error);

        if (error.code === 'ER_DUP_ENTRY' && error.sqlMessage.includes("for key 'customers.document_number'")) {
            res.status(409).json({ error: 'El cliente ya se encuentra registrado' });
        } else {
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
}
