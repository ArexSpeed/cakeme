import React from 'react';
import { loadStripe } from '@stripe/stripe-js';

const PremiumCard = ({ item }) => {
  const handleBuy = async () => {
    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);
    const payload = {
      item
    };

    const response = await fetch(`/api/checkout`, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      const { checkout } = await response.json();
      stripe.redirectToCheckout({ sessionId: checkout.id });
    } else {
      await response.json();
    }
  };

  return (
    <div className="card" style={{ justifyContent: 'center', alignItems: 'center' }}>
      <p>{item.qty} highlights</p>
      <p style={{ fontSize: '30px' }}>€{item.priceCents / 100}.00</p>
      <p>{item.duration} days per highlight</p>
      <button className="button" onClick={handleBuy}>
        Buy
      </button>
    </div>
  );
};

export default PremiumCard;
