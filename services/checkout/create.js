import Stripe from 'stripe';
// import airDB from 'services/airtableClient';
// import Joi from 'joi';
import { getHighlightToPay } from 'services/highlights/getHighlights';

// const schema = Joi.object({
//   id: Joi.required(),
//   offerId: Joi.number().greater(0).required(),
//   quantity: Joi.number().greater(0).required()
// });

const createCheckout = async (payload) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const highlight = await getHighlightToPay(payload.airtableId);
  console.log(highlight, 'highlight in paymanet');
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
  console.log(lineItems, 'lineItems');
  const paymentObject = {
    payment_method_types: ['card', 'p24'],
    payment_intent_data: {
      metadata: {
        highlightId: highlight.id
      }
    },
    line_items: lineItems,
    mode: 'payment',
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/premium`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/premium`
  };
  console.log(paymentObject, 'lpaymentObject');
  const session = await stripe.checkout.sessions.create(paymentObject);
  console.log(session, 'session in service');
  //const offer = await getOfferById(orderItem.offerId);

  // await airDB('offers').update([
  //   {
  //     id: offer.airtableId,
  //     fields: {
  //       stripeCheckoutId: session.id,
  //       stripeCheckoutStatus: session.payment_status,
  //       highlightDuration: product.duration
  //     }
  //   }
  // ]);
  return session;
};

export default createCheckout;
