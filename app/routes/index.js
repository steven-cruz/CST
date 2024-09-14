import { Router } from 'express';
import { verifyToken } from '../middlewares/authMiddleware.js';

const router = Router();

// Initial Page ('Sig in')
router.get('/', (req, res) => {
    res.render('common/pages/login', {title: 'Iniciar sesión'})
});

// Dashboard Admin Page
router.get('/dashboard', verifyToken, (req, res) => {
    res.render('admin/pages/dashboard', {title: 'Panel de administración'})
});

// Customers Page
router.get('/customers' ,verifyToken, (req, res) => {
    res.render('admin/pages/customers', {title: 'Clientes'})
});

// Create a New Customer
router.get('/create-customer' ,verifyToken, (req, res) => {
    res.render('admin/pages/create-customer', {title: 'Crear un nuevo cliente'})
})

// Orders Page
router.get('/orders' ,verifyToken, (req, res) => {
    res.render('admin/pages/orders', {title: 'Ordenes'})
});

// History Orders
router.get('/history-orders' ,verifyToken, (req, res) => {
    res.render('admin/pages/history-orders', {title: 'Historial de ordenes'})
});

// Inventory
router.get('/inventory' ,verifyToken, (req, res) => {
    res.render('admin/pages/inventory', {title: 'Inventario'})
});

// Settings
router.get('/settings' ,verifyToken, (req, res) => {
    res.render('admin/pages/settings', {title: 'Configuraciones'})
});

export default router;
