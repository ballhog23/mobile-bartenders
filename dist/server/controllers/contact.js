import sendEmail from '../services/sendEmail.js';
export default async function handlerContactFormSubmit(req, res, next) {
    const { validatedContactFormInput } = req;
    if (!validatedContactFormInput)
        throw new Error('Validated input is missing and is required');
    const { name } = validatedContactFormInput;
    await sendEmail();
    res.status(201).send({ message: name });
}
