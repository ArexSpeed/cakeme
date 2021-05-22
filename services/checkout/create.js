import Stripe from 'stripe';
import airDB from 'services/airtableClient';
import { getHighlightToPay } from 'services/highlights/getHighlights';

const createCheckout = async (highlightItem, user) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const highlight = await getHighlightToPay(highlightItem.airtableId);

  const lineItems = [
    {
      price_data: {
        currency: highlight.priceCurrency,
        product_data: {
          name: highlight.name,
          metadata: {
            highlightId: highlight.id,
            qty: highlight.qty,
            duration: highlight.duration
          }
        },
        unit_amount: highlight.priceCents
      },
      quantity: 1
    }
  ];

  const paymentObject = {
    payment_method_types: ['card', 'p24'],
    payment_intent_data: {
      metadata: {
        highlightId: highlight.id
      }
    },
    line_items: lineItems,
    mode: 'payment',
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/premium/payments`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/premium/payments`
  };

  const session = await stripe.checkout.sessions.create(paymentObject);

  await airDB('payments').create([
    {
      fields: {
        stripeCheckoutId: session.id,
        stripeCheckoutStatus: session.payment_status,
        user: [user.airtableId],
        highlightOffer: [highlightItem.airtableId]
      }
    }
  ]);

  return session;
};

export default createCheckout;
