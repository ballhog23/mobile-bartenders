import Stripe from "stripe";
import servicesDefinition from "../utils/checkout/servicesDefinition.js";

const stripeCheckout = async (req) => {
    try {
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY_TEST);
        const { service, eventDate } = req;
        const { price, name } = servicesDefinition[service];
        const formattedEventDate = new Date(eventDate).toDateString();
        const lineItems = [{
            quantity: 1,
            price_data: {
                currency: 'usd',
                unit_amount: price,
                product_data: {
                    name: name,
                    description: `You are booking the "${name} service" for your event on ${formattedEventDate}.`
                }
            },
        }];

        const session = await stripe.checkout.sessions.create({
            line_items: lineItems,
            mode: 'payment',
            success_url: "http://localhost:3000/success",
            cancel_url: "http://localhost:3000/cancel"
        })

        if (!session) throw new Error('ERROR CREATING STRIPE CHECKOUT SESSION');

        return session;

    } catch (error) {
        throw new Error(`There was an ERROR with stripeCheckout function.\n ERROR_NAME: ${error.name} \n ERROR_MESSAGE: ${error.message}`)
    }
}

export default stripeCheckout;