import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import dotenv from 'dotenv';
import express from "express";
import compression from "compression";
import routes from './routes/routes.js';

dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// middleware
app.use(compression());
app.use(express.json());
app.use(express.static(join(__dirname, '../public')));

// routes
app.use('/', routes);

export default app;