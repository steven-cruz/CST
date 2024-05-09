import {Router} from 'express';

const router = Router();

// Initial Page ('Sig in')
router.get('/', (req, res) => res.render('global/pages/log-in', {title: 'Iniciar sesión'}));

// Dashboard Admin Page
router.get('/dashboard', (req, res) => res.render('admin/pages/dashboard', {title: 'Panel de administración'}));

// Customers Page
router.get('/customers', (req, res) => res.render('admin/pages/customers', {title: 'Clientes'}));

// Orders Page
router.get('/orders', (req, res) => res.render('admin/pages/orders', {title: 'Ordenes'}));

export default router;
