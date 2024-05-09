import express from 'express';
import {dirname, join} from 'path';
import { fileURLToPath } from 'url';

import indexRoutes from './src/routes/index.js';

const app = express();

const __dirname = dirname(fileURLToPath(import.meta.url));

app.set('views', join(__dirname, 'src/views'));
app.set('view engine', 'ejs');

app.use(indexRoutes);

app.listen(3000);
