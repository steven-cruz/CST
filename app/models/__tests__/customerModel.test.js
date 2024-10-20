import { getAllCustomers, createCustomer, findCustomerById, deleteCustomerById } from '../../models/customerModel.js';
import dbConnection from '../../config/db-connection.js';

jest.mock('../../config/db-connection', () => ({
    query: jest.fn(),
}));

describe('Customer Model', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('getAllCustomers debería devolver una lista de clientes', async () => {
        const mockCustomers = [{ id: 1, first_name: 'John' }, { id: 2, first_name: 'Jane' }];
        dbConnection.query.mockResolvedValue([mockCustomers]);
        const result = await getAllCustomers();

        expect(result).toEqual(mockCustomers);
        expect(dbConnection.query).toHaveBeenCalledWith('SELECT * FROM customers');
    });

    test('createCustomer debería insertar un cliente y devolver el ID', async () => {
        const newCustomer = { document_type: 'ID', document_number: '123456', first_name: 'John', last_name: 'Doe', phone_number: '5551234', address_street: '123 St', email: 'john@example.com' };
        const mockResult = [{ insertId: 1 }];
        dbConnection.query.mockResolvedValue(mockResult);
        const result = await createCustomer(newCustomer);

        expect(result).toEqual({ id: 1 });
        expect(dbConnection.query).toHaveBeenCalled();
    });

    test('findCustomerById debería devolver el cliente correcto', async () => {
        const mockCustomer = { id: 1, first_name: 'John' };
        dbConnection.query.mockResolvedValue([[mockCustomer]]);
        const result = await findCustomerById(1);

        expect(result).toEqual(mockCustomer);
        expect(dbConnection.query).toHaveBeenCalledWith('SELECT * FROM customers WHERE id = ?', [1]);
    });

    test('deleteCustomerById debería eliminar un cliente por su ID', async () => {
        dbConnection.query.mockResolvedValue();

        await deleteCustomerById(1);

        expect(dbConnection.query).toHaveBeenCalledWith('DELETE FROM customers WHERE id = ?', [1]);
    });
});
