import { getPaginatedCustomers, searchCustomers, countAllCustomers, countFilteredCustomers, createCustomer, deleteCustomerById, findCustomerById } from '../models/customerModel.js';

/**
 * Obtener los clientes con paginación y filtrado.
 */
export async function getCustomers(req, res) {
    try {
        const { page = 1, limit = 10, search = '' } = req.query;

        const offset = (page - 1) * limit;
        let customers, totalCustomers;

        if (search) {
            customers = await searchCustomers(search, limit, offset);
            totalCustomers = await countFilteredCustomers(search);
        } else {
            customers = await getPaginatedCustomers(limit, offset);
            totalCustomers = await countAllCustomers();
        }

        const totalPages = Math.ceil(totalCustomers / limit);

        // Devolver los datos al cliente (front-end)
        res.json({
            customers,
            totalCustomers,
            totalPages
        });
    } catch (error) {
        console.error('Error al obtener los clientes:', error);
        res.status(500).json({ error: 'Error al obtener los clientes' });
    }
}

/**
 * Controlador para crear un nuevo cliente.
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
            return res.status(404).json({ error: 'No se encontró el cliente para ser eliminado' });
        }

        // Eliminar el cliente
        await deleteCustomerById(id);
        res.status(200).json({ message: 'Cliente eliminado exitosamente' });
    } catch (error) {
        console.error('Error al eliminar el cliente:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}
