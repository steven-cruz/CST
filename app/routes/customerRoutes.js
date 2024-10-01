import { Router } from 'express';
import multer from 'multer';
import { createCustomerController, deleteCustomerController, getCustomers, getCustomerByIdController, updateCustomerController } from '../controllers/customerController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const router = Router();
const upload = multer();

// Api route for get All Customers.
router.get('/', verifyToken, getCustomers);

// Api route for create a new customer.
router.post('/', verifyToken, upload.none(), createCustomerController);

// Api route for  delete a customer by ID
router.delete('/:id', verifyToken, deleteCustomerController);

// Route to show the edit form
router.get('/edit/:id', verifyToken, getCustomerByIdController);

// Api route to update a customer by ID
router.put('/:id', verifyToken, upload.none(), updateCustomerController);

export default router;
