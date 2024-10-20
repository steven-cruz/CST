import { getAllCustomersController, createCustomerController, deleteCustomerController } from '../../controllers/customerController';
import { getAllCustomers, createCustomer, deleteCustomerById, findCustomerById } from '../../models/customerModel';

jest.mock('../../models/customerModel', () => ({
    getAllCustomers: jest.fn(),
    createCustomer: jest.fn(),
    deleteCustomerById: jest.fn(),
    findCustomerById: jest.fn(),
}));

describe('Customer Controller', () => {
    let req, res;

    beforeEach(() => {
        req = { params: {}, body: {} };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    });

    test('getAllCustomersController debería devolver una lista de clientes', async () => {
        const mockCustomers = [{ id: 1, first_name: 'John' }, { id: 2, first_name: 'Jane' }];
        getAllCustomers.mockResolvedValue(mockCustomers);

        await getAllCustomersController(req, res);

        expect(getAllCustomers).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockCustomers);
    });

    test('createCustomerController debería devolver el ID del cliente creado', async () => {
        const newCustomer = { id: 1 };
        createCustomer.mockResolvedValue(newCustomer);

        req.body = newCustomer;
        await createCustomerController(req, res);

        expect(createCustomer).toHaveBeenCalledWith(newCustomer);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({ id: 1 });
    });

    test('deleteCustomerController debería eliminar un cliente existente', async () => {
        const mockCustomer = { id: 1, first_name: 'John' };
        findCustomerById.mockResolvedValue(mockCustomer);
        deleteCustomerById.mockResolvedValue();

        req.params.id = 1;
        await deleteCustomerController(req, res);

        expect(findCustomerById).toHaveBeenCalledWith(1);
        expect(deleteCustomerById).toHaveBeenCalledWith(1);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ message: 'Cliente eliminado exitosamente' });
    });

    test('deleteCustomerController debería devolver un error si no se encuentra el cliente', async () => {
        findCustomerById.mockResolvedValue(null);

        req.params.id = 1;
        await deleteCustomerController(req, res);

        expect(findCustomerById).toHaveBeenCalledWith(1);
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ error: 'No se encontró el cliente para ser eliminado' });
    });
});
