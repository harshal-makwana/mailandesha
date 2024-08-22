const stripe = require('../config/stripe.config');

const createCheckoutSession = async (amount) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Sample Product',
            },
            unit_amount: amount, // Amount in cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.CLIENT_URL}/success`,
      cancel_url: `${process.env.CLIENT_URL}/cancel`,
    });

    return session.id;
  } catch (error) {
    throw new Error(`Stripe Error: ${error.message}`);
  }
};

module.exports = {
  createCheckoutSession,
};
