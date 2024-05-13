import { Router } from 'express';
import multer from 'multer';
import { getAllCustomersController, createCustomerController } from '../controllers/customerController.js';

const router = Router();
const upload = multer();

/**
 * Route for get All Customers.
 */
router.get('/customers', getAllCustomersController);

/**
 * Router for create a new customer.
 */
router.post('/customer', upload.none(), createCustomerController);

export default router;
