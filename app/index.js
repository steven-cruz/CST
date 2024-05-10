import express from 'express';
import {dirname, join} from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';

import indexRoutes from './routes/index.js';
import customerRoutes from './routes/customerRoutes.js';

const app = express();

const __dirname = dirname(fileURLToPath(import.meta.url));

app.set('views', join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Incluir archivos estáticos desde la carpeta 'public'
app.use(express.static(join(__dirname, 'public')));

// Analizar solicitudes JSON
app.use(bodyParser.json());

/**
 * Routes configuration.
 */
app.use(indexRoutes);
app.use('/api', customerRoutes);

app.listen(3000);
