// handle responding to client after successful email send, pass info to front end? update frontend
import sendEmail from '../services/sendEmail.js';

export default async function handlerContactFormSubmit(req, res, next) {
    try {
        const { sanitizedOutput } = req;
        const { name } = sanitizedOutput;
        sendEmail();
        res.status(201).send({ message: name });
    } catch (error) {
        console.log(error);
    }
}