import { getAllCustomers, createCustomer, deleteCustomerById, findCustomerById } from '../models/customerModel.js';

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

        if (error.code === 'ER_DUP_ENTRY') {
            res.status(409).json({ error: 'El número de documento o correo electrónico ya se encuentra registrado' });
        } else {
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
}

/**
 * Controlador para eliminar un cliente por su ID.
 */
export async function deleteCustomerController(req, res) {
    try {
        const { id } = req.params;

        // Verificar si el cliente existe antes de eliminarlo
        const customer = await findCustomerById(id);
        if (!customer) {
            return res.status(404).json({ error: 'No se encontro el cliente para ser eliminado' });
        }

        // Eliminar el cliente
        await deleteCustomerById(id);
        res.status(200).json({ message: 'Cliente eliminado exitosamente' });
    } catch (error) {
        console.error('Error al eliminar el cliente: ', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}
