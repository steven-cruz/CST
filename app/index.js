// Carga variables de entorno desde .env
import dotenv from 'dotenv';
dotenv.config();

import cookieParser from 'cookie-parser';

import express from 'express';
import {dirname, join} from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';

import indexRoutes from './routes/index.js';
import customerRoutes from './routes/customerRoutes.js';
import userRoutes from './routes/userRoutes.js';

import lessMiddleware from 'less-middleware';

const app = express();

// Configurar middleware de cookies
app.use(cookieParser());

const __dirname = dirname(fileURLToPath(import.meta.url));

// Configurar middleware LESS para compilar archivos .less a .css
app.use(
    lessMiddleware(join(__dirname, 'public/less'), {
        dest: join(__dirname, 'public'), // Directorio de destino para CSS
        // force: true, // Siempre recompilar los archivos LESS
        // debug: true, // Mostrar mensajes de depuración
    })
);

// Incluir archivos estáticos desde la carpeta 'public'
app.use(express.static(join(__dirname, 'public')));

app.set('views', join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Analizar solicitudes JSON
app.use(bodyParser.json());

// Analizar cuerpos de solicitud de formularios
app.use(express.urlencoded({ extended: true }));

// Rutas de paginas
app.use(indexRoutes);

// Apis del sistema
app.use('/api/customers', customerRoutes);
app.use('/api/users', userRoutes);

// Middleware global de manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Error interno del servidor');
});

app.listen(3000, () => {
    console.log('- Servidor corriendo en el puerto 3000');
});
