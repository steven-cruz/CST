import { getAllCustomers } from '../models/customerModel.js';

async function testGetAllCustomers() {
    try {
        const users = await getAllCustomers();
        console.log('Usuarios encontrados:', users);
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
    }
}

testGetAllCustomers();
