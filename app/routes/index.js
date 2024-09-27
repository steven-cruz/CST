import { Router } from 'express';
import { verifyToken } from '../middlewares/authMiddleware.js';

const router = Router();

// Initial Page ('Sig in')
router.get('/', (req, res) => {
    const token = req.cookies?.token;

    if (token) {
        return res.redirect('/dashboard');
    }

    res.render('common/pages/login', {title: 'Iniciar sesión', description: 'Página para el inicio de sesión de la aplicación CST-Americano'})
});

// Dashboard Admin Page
router.get('/dashboard', verifyToken, (req, res) => {
    res.render('admin/pages/dashboard', {title: 'Panel de administración', description: 'Página de navegación para administradores'})
});

// Customers Page
router.get('/customers' ,verifyToken, (req, res) => {
    res.render('admin/pages/customers', {title: 'Clientes', description: 'Muestra todos los clientes registrados en la aplicación CST | Americano'})
});

// Create a New Customer
router.get('/create-customer' ,verifyToken, (req, res) => {
    res.render('admin/pages/create-customer', {title: 'Crear un nuevo cliente', description: 'Página para crear nuevos usuarios'})
})

// Orders Page
router.get('/orders' ,verifyToken, (req, res) => {
    res.render('admin/pages/orders', {title: 'Ordenes', description: 'Visualización de todas las órdenes creadas'})
});

// History Orders
router.get('/history-orders' ,verifyToken, (req, res) => {
    res.render('admin/pages/history-orders', {title: 'Historial de ordenes', description: 'Visualización del historial de ordenes'})
});

// Inventory
router.get('/inventory' ,verifyToken, (req, res) => {
    res.render('admin/pages/inventory', {title: 'Inventario', description: 'Visualización del inventario'})
});

// Settings
router.get('/settings' ,verifyToken, (req, res) => {
    res.render('admin/pages/settings', {title: 'Configuraciones', description: 'Visualización de las configuraciones para administradores'})
});

export default router;
