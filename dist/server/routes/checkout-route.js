import express from 'express';
import { asyncHandler } from '../utils/helpers.js';
// import validateUserInput from '../middlewares/validateUserInput.js';
import handlerCreateCheckoutSession from '../controllers/checkout.js';
const checkoutRouter = express.Router();
// checkoutRouter.use(validateUserInput);
checkoutRouter.post('/create-stripe-session', asyncHandler(handlerCreateCheckoutSession));
export default checkoutRouter;
