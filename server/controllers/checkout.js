import stripeCheckout from '../services/stripeCheckout.js';

export default async function handlerCreateCheckoutSession(params) {
    try {
        const sanitizedOutput = req.sanitizedOutput;
        const stripeCheckoutSession = await stripeCheckout(sanitizedOutput);
        res.status(201).send({ url: stripeCheckoutSession.url });

    } catch (error) {
        throw new Error(`there was an error posting data to stripe session`);
    }

}