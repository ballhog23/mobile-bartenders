// handle responding to client after successful email send, pass info to front end? update frontend
import express from 'express';
import validateUserInput from '../middlewares/validateUserInput.js';
import sanitizeUserInput from '../middlewares/sanitizeUserInput.js';
import sendEmail from '../services/sendEmail.js';
const formController = express.Router();

formController.use(validateUserInput);
formController.use(sanitizeUserInput);

formController.post('/form-submit', (req, res, next) => {
    console.log('hit /form-submit')
    try {
        const { sanitizedOutput } = req;
        const { name } = sanitizedOutput;
        sendEmail();
        res.status(201).send({ message: name })
    } catch (error) {
        console.log(error)
    }
});

export default formController;