import {Router} from 'express';

const router = Router();

// Initial Page ('Sig in')
router.get('/', (req, res) => {
    res.render('common/pages/login', {title: 'Iniciar sesión'})
});

// Dashboard Admin Page
router.get('/dashboard', (req, res) => {
    res.render('admin/pages/dashboard', {title: 'Panel de administración'})
});

// Customers Page
router.get('/customers', (req, res) => {
    res.render('admin/pages/customers', {title: 'Clientes'})
});

// Create a New Customer
router.get('/create-customer', (req, res) => {
    res.render('admin/pages/create-customer', {title: 'Crear un nuevo cliente'})
})

// Orders Page
router.get('/orders', (req, res) => {
    res.render('admin/pages/orders', {title: 'Ordenes'})
});

export default router;
