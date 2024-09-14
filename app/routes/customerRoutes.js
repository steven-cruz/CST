import { Router } from 'express';
import multer from 'multer';
import { getAllCustomersController, createCustomerController } from '../controllers/customerController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const router = Router();
const upload = multer();

// Api route for get All Customers.
router.get('/', verifyToken, getAllCustomersController);

// Api route for create a new customer.
router.post('/', verifyToken, upload.none(), createCustomerController);

export default router;
