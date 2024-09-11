import express from 'express';
import {dirname, join} from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';

import indexRoutes from './routes/index.js';
import customerRoutes from './routes/customerRoutes.js';
import userRoutes from './routes/userRoutes.js';

const app = express();

const __dirname = dirname(fileURLToPath(import.meta.url));

app.set('views', join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Incluir archivos estáticos desde la carpeta 'public'
app.use(express.static(join(__dirname, 'public')));

// Analizar solicitudes JSON
app.use(bodyParser.json());

// Analizar cuerpos de solicitud de formularios
app.use(express.urlencoded({ extended: true }));

/**
 * Routes configuration.
 */
app.use(indexRoutes);
app.use('/api', customerRoutes);
app.use('/api', userRoutes);

app.listen(3000);
