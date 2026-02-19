import sendEmail from '../services/sendEmail.js';
export default async function handlerContactFormSubmit(req, res, next) {
    const { sanitizedOutput } = req;
    if (!sanitizedOutput)
        throw new Error('Sanitized output missing');
    const { name } = sanitizedOutput;
    await sendEmail();
    res.status(201).send({ message: name });
}
