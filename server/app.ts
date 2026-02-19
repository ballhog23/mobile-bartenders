import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import express, { type Express } from 'express';
import compression from 'compression';
import checkoutRouter from './routes/checkout-route.js';
import contactRouter from './routes/contact-route.js';
import { handlerWebError } from './middlewares/web-error-handler.js';

const app: Express = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// middleware
app.use(compression());
app.use(express.json());
app.use(express.static(join(__dirname, '../public')));

// routes
app.use('/checkout', checkoutRouter);
app.use('/contact', contactRouter);

app.use(handlerWebError);

export default app;
