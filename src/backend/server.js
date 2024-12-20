const express = require('express');
const Stripe = require('stripe');
const bodyParser = require('body-parser');
const cors = require('cors');

// Initialize Stripe with your secret key
const stripe = Stripe('your_stripe_secret_key');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Mock user database
const users = {}; // Replace with your actual database

// Endpoint to create a Stripe Checkout session
app.post('/api/subscribe', async (req, res) => {
  const { plan, userAddress } = req.body;

  // Define Stripe price IDs for each plan
  const priceIds = {
    basic: 'price_1YourBasicPriceId',
    pro: 'price_1YourProPriceId',
    enterprise: 'price_1YourEnterprisePriceId',
    free: null, // Free plan doesn't require payment
  };

  if (plan === 'free') {
    // Assign free plan to user
    users[userAddress] = 'free';
    return res.status(200).json({ message: 'Subscribed to free plan' });
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{
      price: priceIds[plan],
      quantity: 1,
    }],
    mode: 'subscription',
    success_url: 'https://yourdomain.com/success?session_id={CHECKOUT_SESSION_ID}',
    cancel_url: 'https://yourdomain.com/cancel',
    metadata: {
      userAddress,
      plan,
    },
  });

  res.json({ checkoutUrl: session.url });
});

// Webhook to handle successful payments
app.post('/api/webhook', bodyParser.raw({ type: 'application/json' }), (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, 'your_webhook_secret');
  } catch (err) {
    console.error(`Webhook signature verification failed.`, err.message);
    return res.sendStatus(400);
  }

  // Handle the event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const userAddress = session.metadata.userAddress;
    const plan = session.metadata.plan;

    // Assign the plan to the user in your database
    users[userAddress] = plan;
    // TODO: Update user subscription in your actual database
  }

  res.json({ received: true });
});

app.listen(3001, () => console.log('Server running on port 3001')); 