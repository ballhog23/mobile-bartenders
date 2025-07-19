import express from 'express';
import formSubmitRoute from '../controllers/contact.js';
const contactRouter = express.Router();
const checkoutRouter = express.Router();

contactRouter.use('/contact', formSubmitRoute);
// checkoutRouter.use('/checkout', (req, res, next) => next());

const routes = [contactRouter, checkoutRouter];

export default routes;