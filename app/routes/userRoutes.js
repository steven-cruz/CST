import { Router } from 'express';
import { createUserController, loginUserController } from '../controllers/userController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const router = Router();

// Api route for create new users.
router.post('/', verifyToken, createUserController);

// Api route for loggin users.
router.post('/login', loginUserController);

export default router;
