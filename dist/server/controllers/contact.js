import sendEmail from '../services/sendEmail.js';
export default async function handlerContactFormSubmit(req, res, next) {
    const validatedContactFormInput = req.body.validatedContactFormInput;
    if (!validatedContactFormInput)
        throw new Error('Validated input is missing and is required');
    const { name } = validatedContactFormInput;
    await sendEmail(validatedContactFormInput);
    res.status(201).send({ message: name });
}
