// handle responding to client after successful email send, pass info to front end? update frontend
import express from 'express';
import sanitizeUserInput from '../middlewares/sanitizeUserInput.js';
import sendEmail from '../services/sendEmail.js';
const formSubmitRoute = express.Router();

formSubmitRoute.use(sanitizeUserInput);

formSubmitRoute.post('/form-submit', (req, res, next) => {
    try {
        console.log(req.body);
        sendEmail();
        res.status(201).send({message: req.sanitizedInput})
    } catch (error) {
        console.log(error)
    }
});

export default formSubmitRoute;