import express from 'express';
import validateUserInput from '../middlewares/validateUserInput.js';
import sanitizeUserInput from '../middlewares/sanitizeUserInput.js';
const checkoutController = express();

checkoutController.use(validateUserInput);
checkoutController.use(sanitizeUserInput);

checkoutController.post('/create-stripe-session', (req, res, next) => {
    const sanitizedOutput = req.sanitizedOutput;
    console.log(sanitizedOutput)
    
    try {
        res.status(201).send({status: 'redir'})
    } catch (error) {
        console.error(error.message)
    }
})

export default checkoutController;