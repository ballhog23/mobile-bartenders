import express from 'express';
import sanitizeUserInput from '../middlewares/sanitizeUserInput.js';
const checkoutController = express();

// checkoutController.use(sanitizeUserInput);

checkoutController.post('/create-stripe-session', (req, res, next) => {
    res.status(201).send('create stripe session')
})

export default checkoutController;