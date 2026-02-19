import type { Request, Response, NextFunction } from 'express';
import sendEmail from '../services/sendEmail.js';

export default async function handlerContactFormSubmit(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { sanitizedOutput } = req;

    if (!sanitizedOutput)
        throw new Error('Sanitized output missing');

    const { name } = sanitizedOutput;
    await sendEmail();

    res.status(201).send({ message: name });
}
