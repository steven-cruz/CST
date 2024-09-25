import { Router } from 'express';
import multer from 'multer';
import { createCustomerController, deleteCustomerController, getCustomers } from '../controllers/customerController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const router = Router();
const upload = multer();

// Api route for get All Customers.
router.get('/', verifyToken, getCustomers);

// Api route for create a new customer.
router.post('/', verifyToken, upload.none(), createCustomerController);

// Api route for  delete a customer by ID
router.delete('/:id', verifyToken, deleteCustomerController);

export default router;
