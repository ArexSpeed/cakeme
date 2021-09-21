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
    <div className="card__payment">
      <div className="card__payment-col qty">
        <span style={{ fontSize: '30px', color: '#ffffff', textShadow: '0 0 4px rgba(0,0,0,.5)' }}>
          {item.qty}
        </span>
        <span style={{ fontSize: '12px', color: '#333' }}>highlights</span>
      </div>
      <div className="card__payment-col">
        <span style={{ fontSize: '30px' }}>€{item.priceCents / 100}.00</span>
        <span style={{ fontSize: '12px' }}>{item.duration} days per highlight</span>
      </div>
      <button className="card__payment-button" onClick={handleBuy}>
        BUY
      </button>
    </div>
  );
};

export default PremiumCard;
