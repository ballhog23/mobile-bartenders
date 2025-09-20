import express from 'express';
import sanitizeUserInput from '../middlewares/sanitizeUserInput.js';
import stripeCheckout from '../services/stripeCheckout.js';
const checkoutController = express();

checkoutController.use(sanitizeUserInput);

checkoutController.post('/create-stripe-session', async (req, res, next) => {
    try {
        const sanitizedOutput = req.sanitizedOutput;
        const stripeCheckoutSession = await stripeCheckout(sanitizedOutput);
        res.status(201).send({ url: stripeCheckoutSession.url });

    } catch (error) {
        throw new Error(`there was an error posting data to stripe session`)
    }
})

export default checkoutController;