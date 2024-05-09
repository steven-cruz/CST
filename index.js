import express from 'express';
import {dirname, join} from 'path';
import { fileURLToPath } from 'url';
import indexRoutes from './routes/index.js';

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

import fs from 'fs';

const files = fs.readdirSync(join(__dirname, 'views/dashboard-admin/components'));
console.log(files);

app.set('views', join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(indexRoutes);

app.listen(3000);
