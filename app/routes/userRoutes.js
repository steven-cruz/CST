import { Router } from 'express';
import { createUserController, loginUserController } from '../controllers/userController.js';

const router = Router();

// Ruta para crear un nuevo usuario
router.post('/users', createUserController);

// Ruta para el inicio de sesión
router.post('/login', loginUserController);

export default router;
