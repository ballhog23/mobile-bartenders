import express from 'express';
import { asyncHandler } from "../utils/helpers.js";
import sanitizeUserInput from '../middlewares/sanitizeUserInput.js';
import handlerCreateCheckoutSession from '../controllers/checkout.js';

const checkoutRouter = express.Router();

checkoutRouter.use(sanitizeUserInput);

checkoutRouter.post('/create-stripe-session', asyncHandler(handlerCreateCheckoutSession));

export default checkoutRouter;