import { getAllCustomers, updateCustomer, getPaginatedCustomers, searchCustomers, countAllCustomers, countFilteredCustomers, createCustomer, deleteCustomerById, findCustomerById } from '../models/customerModel.js';

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
 * Controller for Get customer by ID.
 */
export async function getCustomerByIdController(req, res) {
    try {
        const { id } = req.params;
        const customer = await findCustomerById(id);

        if (!customer) {
            return res.status(404).json({ error: 'Cliente no encontrado' });
        }

        res.render('admin/pages/edit-customer', {
            title: 'Editar cliente',
            customer: customer
        });
    } catch (error) {
        console.error('Error al obtener el cliente: ', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

/**
 * Controlador para actualizar un cliente.
 */
export async function updateCustomerController(req, res) {
    try {
        const { id } = req.params;
        const customerData = req.body;

        const customer = await findCustomerById(id);
        if (!customer) {
            return res.status(404).json({ error: 'Cliente no encontrado' });
        }

        // Actualizar cliente
        await updateCustomer(id, customerData);
        res.status(200).json({ message: 'Cliente actualizado exitosamente' });
    } catch (error) {
        console.error('Error al actualizar el cliente: ', error);
        res.status(500).json({ error: 'Error interno del servidor' });
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
