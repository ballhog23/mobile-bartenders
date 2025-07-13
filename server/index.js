import express from 'express';
import Stripe from 'stripe';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment vars from .env
dotenv.config();

// Ensure Stripe key is present before the app starts
if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing STRIPE_SECRET_KEY in environment variables');
}

// Initialize Stripe client
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const app = express();

// Support __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log(__filename);
console.log(__dirname);

// Serve all static files from public/
app.use(express.static(path.join(__dirname, '../public')));

// Parse JSON request bodies
app.use(express.json());

// Pricing catalog (values in cents)
const services = {
  basic: { price: 1000, name: 'Basic Service' },
  premium: { price: 2000, name: 'Premium Service' },
};

/**
 * POST /create-checkout-session
 * Validates input and creates a Stripe Checkout session
 */
app.post('/create-checkout-session', async (req, res) => {
  const { name, email, eventDate, service } = req.body;

  // Validate required fields using negations/guard clause (if any input field is invalid, it will return immediately)
  if (
    typeof name !== 'string' ||
    typeof email !== 'string' ||
    typeof eventDate !== 'string' ||
    !services[service]
  ) {
    // return 400 error to client from express server
    return res.status(400).json({ error: 'Missing or invalid field(s).' });
  }

  // Build line item for Stripe
  const lineItems = [
    {
      price_data: {
        currency: 'usd',
        unit_amount: services[service].price,
        product_data: {
          name: `${services[service].name} for ${name}`,
          description: `Event Date: ${eventDate}`,
        },
      },
      quantity: 1,
    },
  ];

  console.log(req)

  try {
    // Create Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      customer_email: email, // Auto-populates Stripe's email field
      line_items: lineItems,
      mode: 'payment',
      // Use dynamic base URL so code works in dev and prod, may want to hardcode https not sure here
      success_url: `${req.protocol}://${req.get('host')}/success.html`,
      cancel_url: `${req.protocol}://${req.get('host')}/cancel.html`,
    });

    // Respond with session URL to redirect user
    res.json({ url: session.url });
  } catch (err) {
    console.error('Stripe error:', err);
    res.status(500).json({ error: 'Failed to create checkout session.' });
  }
});

// Start Express server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
