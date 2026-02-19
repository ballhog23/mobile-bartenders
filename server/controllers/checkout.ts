import type { Request, Response, NextFunction } from 'express';
import stripeCheckout from '../services/stripeCheckout.js';

export default async function handlerCreateCheckoutSession(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const sanitizedOutput = req.sanitizedOutput;
        const stripeCheckoutSession = await stripeCheckout(sanitizedOutput!);
        res.status(201).send({ url: stripeCheckoutSession.url });

    } catch (error) {
        throw new Error('there was an error posting data to stripe session');
    }
}
