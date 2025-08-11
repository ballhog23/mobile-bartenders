import express from 'express';
import sanitizeUserInput from '../middlewares/sanitizeUserInput.js';
const checkoutController = express();

// checkoutController.use(sanitizeUserInput);

checkoutController.post('/create-stripe-session', (req, res, next) => {
    
    try {
        console.log('hit')
        console.log(req.body)
        res.status(201).send({status: 'redir'})
        console.log('sent')
    } catch (error) {
        console.error(error.message)
    }
})

export default checkoutController;