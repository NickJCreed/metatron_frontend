const functions = require('firebase-functions');
const admin = require('firebase-admin');
const Stripe = require('stripe');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

admin.initializeApp();
const db = admin.firestore();

const stripe = Stripe('your_stripe_secret_key');

const app = express();
app.use(cors({ origin: true }));
app.use(bodyParser.json());

// Endpoint to create a Stripe Checkout session
app.post('/create-checkout-session', async (req, res) => {
  const { plan, userId } = req.body;

  const priceIds = {
    basic: 'price_1YourBasicPriceId',
    pro: 'price_1YourProPriceId',
    enterprise: 'price_1YourEnterprisePriceId',
  };

  if (plan === 'free') {
    // Assign free plan to user in Firestore
    await db.collection('users').doc(userId).update({
      subscription: 'free',
    });
    return res.status(200).json({ message: 'Subscribed to free plan' });
  }

  try {
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
        userId,
        plan,
      },
    });

    res.json({ checkoutUrl: session.url });
  } catch (error) {
    console.error("Error creating Stripe Checkout session:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Stripe webhook to handle subscription events
app.post('/webhook', async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, 'your_stripe_webhook_secret');
  } catch (err) {
    console.error(`Webhook signature verification failed.`, err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const userId = session.metadata.userId;
    const plan = session.metadata.plan;

    // Update user subscription in Firestore
    await db.collection('users').doc(userId).update({
      subscription: plan,
    });
  }

  res.json({ received: true });
});

exports.api = functions.https.onRequest(app);
exports.stripeWebhook = functions.https.onRequest((req, res) => {
  // Ensure raw body is passed for Stripe signature verification
  // This requires specific Firebase Function configuration
}); 