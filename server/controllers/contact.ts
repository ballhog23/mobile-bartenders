import sendEmail from '../services/sendEmail.js';
import type { Request, Response, NextFunction } from 'express';
import type { ContactFormSchema } from "../utils/zod.js";

export default async function handlerContactFormSubmit(req: Request, res: Response, next: NextFunction): Promise<void> {
    const validatedContactFormInput: ContactFormSchema = req.body.validatedContactFormInput;

    if (!validatedContactFormInput)
        throw new Error('Validated input is missing and is required');

    const { name } = validatedContactFormInput;
    await sendEmail(validatedContactFormInput);

    res.status(201).send({ message: name });
}
