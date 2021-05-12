import React from 'react';

const PremiumCard = ({ item }) => {
  return (
    <div className="card" style={{ justifyContent: 'center', alignItems: 'center' }}>
      <p>{item.qty} highlights</p>
      <p style={{ fontSize: '30px' }}>${item.price}</p>
      <p>{item.duration} days per highlight</p>
      <button className="button">Buy</button>
    </div>
  );
};

export default PremiumCard;
