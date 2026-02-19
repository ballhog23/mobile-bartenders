import type { Request, Response, NextFunction } from 'express';
import stripeCheckout from '../services/stripeCheckout.js';

export default async function handlerCreateCheckoutSession(req: Request, res: Response, next: NextFunction): Promise<void> {
    const validatedContactFormInput = req.body.validatedContactFormInput;
    if (!validatedContactFormInput)
        throw new Error('Validated input is missing and is required');

    const stripeCheckoutSession = await stripeCheckout(validatedContactFormInput);
    res.status(201).send({ url: stripeCheckoutSession.url });
}
