import { Router } from 'express';
import { createUserController, loginUserController } from '../controllers/userController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const router = Router();

// Api route for create new users.
router.post('/', verifyToken, createUserController);

// Api route for loggin users.
router.post('/login', loginUserController);

// Api route for logout users.
router.post('/logout', (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: 'Cierre de sesión exitoso' });
});

export default router;
