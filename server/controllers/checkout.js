import express from 'express';
import validateUserInput from '../middlewares/validateUserInput.js';
import sanitizeUserInput from '../middlewares/sanitizeUserInput.js';
import stripeCheckout from '../services/stripeCheckout.js';
const checkoutController = express();

checkoutController.use(validateUserInput);
checkoutController.use(sanitizeUserInput);

checkoutController.post('/create-stripe-session', async (req, res, next) => {
    try {
        const sanitizedOutput = req.sanitizedOutput;
        const stripeCheckoutSession = await stripeCheckout(sanitizedOutput);
        res.status(201).send({url: stripeCheckoutSession.url});

    } catch(error) {
        throw new Error(`there was an ERROR posting data to /create-stripe-session.\n ERROR_NAME: ${error.name} \n ERROR_MESSAGE: ${error.message}`)
    }
})

export default checkoutController;