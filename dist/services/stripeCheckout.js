import Stripe from 'stripe';
import servicesDefinition from '../utils/checkout/servicesDefinition.js';
const stripeCheckout = async (sanitizedOutput) => {
    try {
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY_TEST);
        const { service, eventDate, email } = sanitizedOutput;
        const { price, name } = servicesDefinition[service];
        const formattedEventDate = new Date(eventDate).toDateString();
        const lineItems = [{
                quantity: 1,
                price_data: {
                    currency: 'usd',
                    unit_amount: price,
                    product_data: {
                        name: name,
                        description: `You are booking the "${name} service" for your event on ${formattedEventDate}.`,
                    },
                },
            }];
        const session = await stripe.checkout.sessions.create({
            line_items: lineItems,
            customer_email: email,
            mode: 'payment',
            success_url: 'https://calebpirkle.com/success',
            cancel_url: 'https://calebpirkle.com/cancel',
        });
        if (!session)
            throw new Error('ERROR CREATING STRIPE CHECKOUT SESSION');
        return session;
    }
    catch (error) {
        throw new Error('error creating session');
    }
};
export default stripeCheckout;
