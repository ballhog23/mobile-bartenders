// logic for stripe checkout flow
import Stripe from "stripe";
import servicesDefinition from "../utils/checkout/servicesDefinition.js";

const stripeCheckout = async (req) => {
    try {
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY_TEST);
        const { service } = req;
        const lineItems = [{
            quantity: 1,
            price_data: {
                currency: 'usd',
                unit_amount: servicesDefinition[service],
                product_data: {
                    name: service,
                }
            },
        }];

        const session = await stripe.checkout.sessions.create({
            line_items: lineItems,
            mode: 'payment',
            success_url: "https://calebpirkle.com/success",
            cancel_url: "https://calebpirkle.com/cancel"
        })

        if (!session) throw new Error('ERROR CREATING STRIPE CHECKOUT SESSION');
        console.log('success, passing session to controller to redirect')
        return session;

    } catch (error) {
        throw new Error(`There was an ERROR with stripeCheckout function.\n ERROR_NAME: ${error.name} \n ERROR_MESSAGE: ${error.message}`)
    }
}

export default stripeCheckout;