import { Router } from 'express';
import { getAllCustomersController, createCustomerController } from '../controllers/customerController.js';

const router = Router();

/**
 * Route for get All Customers.
 */
router.get('/customers', getAllCustomersController);

/**
 * Router for create a new customer.
 */
router.post('/customer', createCustomerController);

export default router;
