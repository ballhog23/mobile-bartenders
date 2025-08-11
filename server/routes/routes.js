import express from 'express';
import formController from '../controllers/contact.js';
import checkoutController from '../controllers/checkout.js';
const contactRouter = express.Router();
const checkoutRouter = express.Router();

contactRouter.use('/contact', formController);
checkoutRouter.use('/checkout', checkoutController);

const routes = [contactRouter, checkoutRouter];

export default routes;