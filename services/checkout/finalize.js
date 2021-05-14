import Stripe from 'stripe';
import airDB from 'services/airtableClient';
import { getPayment } from 'services/payments/getPayment';

export const finalize = async (paymentId, userId) => {
  console.log(paymentId, 'payment in finalize form front');
  let payment = await getPayment(paymentId);
  console.log(payment, 'payment finalize');
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const checkout = await stripe.checkout.sessions.retrieve(payment.stripeCheckoutId);
  //zatrzymuje jesli jest nie oplacone ale skonczone
  if (payment.stripeCheckoutStatus === 'succeeded' || checkout.payment_status === 'unpaid') {
    return { payment, checkout };
  }
  //informacje dotyczace platnosci
  const paymentIntent = await stripe.paymentIntents.retrieve(checkout.payment_intent);

  if (paymentIntent.status === 'succeeded') {
    payment = await airDB('payments').update([
      {
        id: payment.airtableId,
        fields: {
          stripeCheckoutStatus: paymentIntent.status
        }
      }
    ]);

    await airDB('users').update([
      {
        id: userId,
        fields: {
          highlights: 10
        }
      }
    ]);

    return { payment: payment[0].fields, checkout };
  }
  return { payment, checkout };
};

export default finalize;
