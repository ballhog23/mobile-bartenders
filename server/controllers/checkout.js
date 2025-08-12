import express from 'express';
import sanitizeUserInput from '../middlewares/sanitizeUserInput.js';
const checkoutController = express();

checkoutController.use(sanitizeUserInput);

checkoutController.post('/create-stripe-session', (req, res, next) => {
    
    try {
        res.status(201).send({status: 'redir'})
    } catch (error) {
        console.error(error.message)
    }
})

export default checkoutController;